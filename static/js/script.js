document.getElementById('photo-form').onsubmit = async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/upload_photo', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    if (response.ok) {
        const img = document.createElement('img');
        img.src = '/' + result.result_path;
        document.getElementById('image-result').innerHTML = '';
        document.getElementById('image-result').appendChild(img);
    } else {
        alert('Error: ' + result);
    }
};

document.getElementById('video-form').onsubmit = async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/upload_video', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    if (response.ok) {
        const a = document.createElement('a');
        a.href = '/' + result.output_file;
        a.innerText = 'Download processed video';
        a.target = '_blank';
        document.getElementById('video-result').innerHTML = '';
        document.getElementById('video-result').appendChild(a);
    } else {
        alert('Error: ' + result);
    }
};

function streamVideo() {
    const videoStream = document.getElementById('video-stream');
    const img = document.createElement('img');
    img.src = '/stream';
    videoStream.innerHTML = '';
    videoStream.appendChild(img);
}
