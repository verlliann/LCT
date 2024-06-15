document.addEventListener("DOMContentLoaded", function() {

    let addVideo =document.getElementById("addVideo");

    addVideo.addEventListener('change', function (event) {
        console.log(event.target.files.length)
        for (let photoCount = 0; photoCount < event.target.files.length; photoCount++) {
            let formData = new FormData();
            formData.append('photo', event.target.files[photoCount]);
            fetch('/upload_photo', {
                    method: 'POST',
                    body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Photo uploaded successfully:', data);

                let img = document.createElement('img');
                img.src = data.result_path;
                img.className='videoplayers';
                img.id="videoplayers";
                document.getElementById('video-placeholder').appendChild(img);
            })

        }
        let text1 = document.createElement('label');
        text1.textContent = "Дата/Время:   " + String(new Date().getDate()) + "." + String(new Date().getMonth()) + "." + String(new Date().getFullYear()-2000) + "  /  " + String(new Date().getHours()) + ":" + String(new Date().getMinutes());
        document.getElementById('sidebar').appendChild(text1);
        let lineBreak1 = document.createElement('br');
        document.getElementById('sidebar').appendChild(lineBreak1);

        let text2 = document.createElement('label');
        text2.textContent = "Загружено фото: " + String(event.target.files.length);
        document.getElementById('sidebar').appendChild(text2);
        let lineBreak2 = document.createElement('br');
        document.getElementById('sidebar').appendChild(lineBreak2);

        let text3 = document.createElement('label');
        text3.textContent = "Фото с обнаруженными обьектами: " + String(event.target.files.length);
        document.getElementById('sidebar').appendChild(text3);
        let lineBreak3 = document.createElement('br');
        document.getElementById('sidebar').appendChild(lineBreak3);

        let button = document.createElement('button');
        button.textContent = 'Скачать';

        button.addEventListener('click', function() {
            fetch('/get-archive-link')
                .then(response => response.json())
                .then(data => {
                    let a = document.createElement('a');
                    a.href = data.link;
                    a.download = 'archive.zip';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                })
                .catch(error => console.error('Error fetching archive link:', error));
        });

        document.getElementById('sidebar').appendChild(button);
        let lineBreak4 = document.createElement('br');
        document.getElementById('sidebar').appendChild(lineBreak4);
    })
});