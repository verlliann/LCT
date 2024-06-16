document.addEventListener("DOMContentLoaded", function() {
    let addVideo =document.getElementById("addVideo");

    addVideo.addEventListener('change', async function (event) {
        console.log(event.target.files.length)
        for (let photoCount = 0; photoCount < event.target.files.length; photoCount++) {
            let formData = new FormData();
            formData.append('video', event.target.files[photoCount]);
            fetch('/upload_video', {
                    method: 'POST',
                    body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Photo uploaded successfully:', data.output_file);
                let video = document.createElement('video');
                video.src = data.output_file;
                video.className='videoplayers';
                video.id="videoplayers";
                video.autoplay = 'true';
                document.getElementById('video-placeholder').appendChild(video);
                //let video = document.getElementById('videoplayers');
                //video.src = data.output_file;
            })
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
        text3.textContent = "Загружено видео:";
        document.getElementById('sidebar').appendChild(text3);

        let label_nums = document.createElement('label');
        label_nums.textContent = String(event.target.files.length);
        label_nums.style = 'margin-left: 130px;';
        document.getElementById('sidebar').appendChild(label_nums);

        document.getElementById('sidebar').appendChild(document.createElement('br'));
        document.getElementById('sidebar').appendChild(document.createElement('br'));


        let label_for_button = document.createElement('label');
        label_for_button.textContent = 'Файл:';
        label_for_button.id = 'label_for_button';
        label_for_button.style = 'margin-left: 15px;'

        document.getElementById('sidebar').appendChild(label_for_button);

        let button = document.createElement('button');
        button.textContent = 'Скачать';
        button.id = 'button_download';
        document.getElementById('sidebar').appendChild(button);

        button.addEventListener('click', async function() {
            try {
                let response = await fetch('/download-archive');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                let blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'archive.zip';
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
    })

    var scrollTopButton = document.getElementById('scroll-top'); //функция для скрола вверх
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
    logo_go_me2.addEventListener('click', function() { //ссылка на себя при клике на логотипе1
        window.open('2.html'); });
    logo_go_me1.addEventListener('click', function() { //ссылка на себя при клике на логотипе2
        window.open('2.html'); });

});