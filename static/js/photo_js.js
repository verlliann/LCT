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
                let texts = document.createElement('label');
                texts.id = 'texts';
                document.getElementById('sidebar').appendChild(texts);
                document.getElementById('texts').innerHTML = 'Файл создан';
                let img = document.createElement('img');
                img.src = data.result_path;
                img.className='videoplayers';
                img.id="videoplayers";
                document.getElementById('video-placeholder').appendChild(img);
            })
        }
    })
});