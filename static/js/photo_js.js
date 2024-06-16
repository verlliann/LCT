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
                document.getElementById('video-placeholder').appendChild(img);
            } catch (error) {
                console.error('Error uploading photo:', error);
            }
        }

        // Добавление информации о дате и времени
        let text1 = document.createElement('label');
        text1.textContent = "Дата/Время:   " +
            String(new Date().getDate()) + "." +
            String(new Date().getMonth() + 1) + "." +
            String(new Date().getFullYear() - 2000) + "  /  " +
            String(new Date().getHours()) + ":" +
            String(new Date().getMinutes()).padStart(2, '0');
        document.getElementById('sidebar').appendChild(text1);
        document.getElementById('sidebar').appendChild(document.createElement('br'));

        // Добавление информации о загруженных фото
        let text2 = document.createElement('label');
        text2.textContent = "Загружено фото: " + String(event.target.files.length);
        document.getElementById('sidebar').appendChild(text2);
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

            let text3 = document.createElement('label');
            text3.textContent = "Фото с обнаруженными объектами: " + String(data.num_photos); // Изменено на data.num_photos
            document.getElementById('sidebar').appendChild(text3);
            document.getElementById('sidebar').appendChild(document.createElement('br'));
        } catch (error) {
            console.error('Error fetching photo data:', error);
        }

        // Создание кнопки для скачивания архива
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
    });


});