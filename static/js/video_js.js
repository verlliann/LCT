document.addEventListener("DOMContentLoaded", function() {
    let addVideo =document.getElementById("addVideo");
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
    })
});