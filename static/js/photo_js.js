document.addEventListener("DOMContentLoaded", function() {
    let addVideo = document.getElementById("addVideo");

    addVideo.addEventListener('change', async function(event) {
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

                let img = document.createElement('img');
                img.src = data.result_path;
                img.className = 'videoplayers';
                img.id = "videoplayers";
                img.style = 'margin-bottom: 20px; border: 1px solid; border-radius: 3px';
                document.getElementById('video-placeholder').appendChild(img);
            } catch (error) {
                console.error('Error uploading photo:', error);
            }
        }

        let text0 = document.createElement('label');
        text0.id = 'text0';

        let text1 = document.createElement('label');
        text1.id = 'text1';
        text1.style = 'margin-left: 15px;';
        text1.textContent = "Дата/Время:";
        document.getElementById('sidebar').appendChild(text1);

        let text2 = document.createElement('label');
        text2.id = "text_date";
        text2.textContent = String(new Date().getDate()) + "." +
            String(new Date().getMonth() + 1) + "." +
            String(new Date().getFullYear() - 2000) + "  /  " +
            String(new Date().getHours()) + ":" +
            String(new Date().getMinutes()).padStart(2, '0');
        document.getElementById('sidebar').appendChild(text2);

        document.getElementById('sidebar').appendChild(document.createElement('br'));
        document.getElementById('sidebar').appendChild(document.createElement('br'));

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

        try {
            let response = await fetch('/get_photo_data', {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data = await response.json();

            let text4 = document.createElement('label');
            text4.textContent = "Изображения с объектами: ";
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

        let label_for_button = document.createElement('label');
        label_for_button.textContent = 'Файл:';
        label_for_button.id = 'label_for_button';
        label_for_button.style = 'margin-left: 15px;'

        document.getElementById('sidebar').appendChild(label_for_button);

        let button = document.createElement('button');
        button.textContent = 'Скачать';
        button.id = 'button_download';
        button.addEventListener('click', async function() {
            window.location.href = '/download-archive';
        });
        document.getElementById('sidebar').appendChild(button);



        document.getElementById('sidebar').appendChild(document.createElement('br'));
        let hr = document.createElement('hr');
        hr.id = 'line_button_info';
        document.getElementById('sidebar').appendChild(hr);
    });

    var scrollTopButton = document.getElementById('scroll-top');

    function showScrollTop() {
        if (window.scrollY > 200) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', showScrollTop);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    scrollTopButton.addEventListener('click', scrollToTop);

    const logo_go_me1 = document.getElementById('logo_pict');
    const logo_go_me2 = document.getElementById('logo_main');
    logo_go_me2.addEventListener('click', function() {
        window.open('/photo');
    });
    logo_go_me1.addEventListener('click', function() {
        window.open('/photo');
    });
});
