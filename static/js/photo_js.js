document.addEventListener("DOMContentLoaded", function() {

    let addVideo =document.getElementById("addVideo");

    // Обработчик события изменения input для загрузки видео
    // Обработчик события изменения input для загрузки видео
    addVideo.addEventListener('change', async function (event) {
        console.log(event.target.files.length);

        // Загрузка каждого файла
        for (let photoCount = 0; photoCount < event.target.files.length; photoCount++) {
            let formData = new FormData();
            formData.append('photo', event.target.files[photoCount]);

            try {
                let response = await fetch('/upload_photo', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                let data = await response.json();
                console.log('Photo uploaded successfully:', data);

                let img = document.createElement('img');
                img.src = data.result_path;
                img.className = 'videoplayers';
                img.id = "videoplayers";
                img.style = 'margin-bottom: 20px; border: 1px solid; border-radius: 3px'
                document.getElementById('video-placeholder').appendChild(img);
            } catch (error) {
                console.error('Error uploading photo:', error);
            }
        }


        // Добавление информации о дате и времени
        let text0 = document.createElement('label'); // Первый второй третий пак
        text0.id = 'text0'


        let text1 = document.createElement('label');
        text1.id = 'text1';
        text1.style = 'margin-left: 15px;';
        text1.textContent = "Дата/Время:" ;
        document.getElementById('sidebar').appendChild(text1);

        let text2 = document.createElement('label');
        text2.id = "text_date";

        text2.textContent =String(new Date().getDate()) + "." +
            String(new Date().getMonth() + 1) + "." +
            String(new Date().getFullYear() - 2000) + "  /  " +
            String(new Date().getHours()) + ":" +
            String(new Date().getMinutes()).padStart(2, '0');
        document.getElementById('sidebar').appendChild(text2);

        document.getElementById('sidebar').appendChild(document.createElement('br'));
        document.getElementById('sidebar').appendChild(document.createElement('br'));

        // Добавление информации о загруженных фото
        let text3 = document.createElement('label');
        text3.id = 'text2';
        text3.style = 'margin-left: 15px;';
        text3.textContent = "Загружено изображений:";
        document.getElementById('sidebar').appendChild(text3);

        let label_nums = document.createElement('label');
        label_nums.textContent = String(event.target.files.length);
        label_nums.style = 'margin-left: 130px;';
        document.getElementById('sidebar').appendChild(label_nums);

        document.getElementById('sidebar').appendChild(document.createElement('br'));
        document.getElementById('sidebar').appendChild(document.createElement('br'));

        // Получение данных о фото с обнаруженными объектами с сервера
        try {
            let response = await fetch('/get_photo_data', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data = await response.json();

            let text4 = document.createElement('label');
            text4.textContent = "Изображения с объектами: "; // Изменено на data.num_photos
            text4.id = 'text3';
            text4.style = 'margin-left: 15px;';
            document.getElementById('sidebar').appendChild(text4);

            let label_nums2 = document.createElement('label');
            label_nums2.style = 'margin-left: 100px;';
            label_nums2.textContent = String(data.num_photos);
            document.getElementById('sidebar').appendChild(label_nums2);

            document.getElementById('sidebar').appendChild(document.createElement('br'));
            document.getElementById('sidebar').appendChild(document.createElement('br'));
        } catch (error) {
            console.error('Error fetching photo data:', error);
        }
        // Создание кнопки для скачивания архива
        let label_for_button = document.createElement('label');
        label_for_button.textContent = 'Файл:';
        label_for_button.id = 'label_for_button';
        label_for_button.style = 'margin-left: 15px;'


        document.getElementById('sidebar').appendChild(label_for_button);

        let button = document.createElement('button');
        button.textContent = 'Скачать';
        button.id = 'button_download';
        document.getElementById('sidebar').appendChild(button);

        button.addEventListener('click', async function () {
            try {
                let response = await fetch('/download-archive');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                let blob = await response.blob();
                console.log(blob);
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'archive.zip'; // Имя файла при скачивании
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error fetching archive link:', error);
            }
        });

        document.getElementById('sidebar').appendChild(document.createElement('br'));
        let hr = document.createElement('hr');
        hr.id = 'line_button_info';
        document.getElementById('sidebar').appendChild(hr);

    });


});