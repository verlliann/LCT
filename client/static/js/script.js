document.getElementById('photo-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch('/upload_photo', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    displayImageResult(result);
});

document.getElementById('video-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch('/upload_video', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    displayVideoResult(result);
});

function streamVideo() {
    window.location.href = '/stream_video';
}

function displayImageResult(result) {
    const container = document.getElementById('image-result');
    container.innerHTML = '';

    const img = new Image();
    img.src = 'http://localhost:5000/static/results/result.jpg';
    container.appendChild(img);

    result.predictions.forEach(pred => {
        const rect = document.createElement('div');
        rect.style.position = 'absolute';
        rect.style.border = '2px solid red';
        rect.style.left = `${pred.bbox[0]}px`;
        rect.style.top = `${pred.bbox[1]}px`;
        rect.style.width = `${pred.bbox[2] - pred.bbox[0]}px`;
        rect.style.height = `${pred.bbox[3] - pred.bbox[1]}px`;
        container.appendChild(rect);
    });
}

function displayVideoResult(result) {
    const container = document.getElementById('video-result');
    container.innerHTML = `<video controls><source src="http://localhost:5000/${result.output_file}" type="video/avi"></video>`;
}
