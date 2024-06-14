document.addEventListener("DOMContentLoaded", function() {
    let videoPlayer = document.getElementById('videoplayers');
    let addVideo =document.getElementById("addVideo");
    function videoAct() { //Запускаем или ставим на паузу
        if(videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };
    videoPlayer.addEventListener('click',videoAct);
    addVideo.addEventListener('change', function (event) {
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
                let video = document.getElementById('videoplayers');
                video.src = data.output_file;
            })
        }
    })
});