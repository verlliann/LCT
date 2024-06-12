document.addEventListener("DOMContentLoaded", function() {
    let videoPlayer = document.getElementById('videoplayer');
    let progressBar = document.getElementById('video-hud__progress-bar');
    let currTime = document.getElementById('video-hud__curr-time');
    let durationTime = document.getElementById('video-hud__duration');
    let actionButton = document.getElementById('video-hud__action');
    let muteButton = document.getElementById('video-hud__mute');
    let volumeScale = document.getElementById('video-hud__volume');
    let speedSelect = document.getElementById('video-hud__speed');
    let timeDisplay = document.getElementById("video-hud__duration");
    let timeDisplayStart = document.getElementById("video-hud__curr-time");
    let fullScreen = document.getElementById("fullScreen");
    let addButtonVideo = document.getElementById("addVideo");
    let progressBarVolume = document.getElementById("video-hud__volume");
    let webLinkd = document.getElementById("webLinkd");
    let webLinkdButton = document.getElementById("webLinkdButton");
    let currentVolume = videoPlayer.volume;
    let count = 0;
    function videoAct() { //Запускаем или ставим на паузу
        if(videoPlayer.paused) {
            videoPlayer.play();
            actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_play');
            console.log("GOOOOOD")
            console.log(document.fullscreenEnabled)
        } else {
            videoPlayer.pause();
            actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_pause');
        }
    }   ;
    // Функция для форматирования времени в формате MM:SS
    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    // Обновление отображения времени при загрузке метаданных видео
    videoPlayer.addEventListener('loadedmetadata', function() {
        timeDisplay.textContent = `00:00 / ${formatTime(videoPlayer.duration)}`;
    });
    videoPlayer.addEventListener('timeupdate', function() {
        timeDisplayStart.textContent = `${formatTime(videoPlayer.currentTime)}`;
    });
    // Обновление отображения времени во время воспроизведения
    videoPlayer.addEventListener('timeupdate', function() {
        timeDisplay.textContent = `${formatTime(videoPlayer.duration)}`;
    });
    // Функция для обновления ползунка range и заполненной части
    function updateRange() {
        const value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressBar.value = `${value}`;
    };
    progressBar.addEventListener('click', function(e) {
        let time = (e.offsetX * videoPlayer.duration)/progressBar.clientWidth;
        progressBar.value = (e.offsetX * 100)/progressBar.clientWidth;
        videoPlayer.currentTime = time;
        progressBar.blur();
    });
    function addVideoFile(e) {
        let file = e.target.files[0];
        console.log(e.target.files[0].name);
        console.log("Имя загруженного файла")
        let url = URL.createObjectURL(file);
        console.log(url);
        console.log("Бинарная кодировка")
        console.log(e.target.baseURI)
        console.log("Путь к проекту")
        videoPlayer.src = url;
    };
    function updateRangeVolume() {
        videoPlayer.volume = this.value/100;
        //100 для того, что бы не было ошибки,
        // т.к. звук изменяется от 0.0 до 1.0
    };
    // Добавляем обработчик события timeupdate к видео
    videoPlayer.addEventListener('timeupdate', updateRange);
    //Запуск, пауза
    actionButton.addEventListener('click',videoAct);
    videoPlayer.addEventListener('click',videoAct);
    //Добавить видео
    addButtonVideo.addEventListener('change', addVideoFile);
    // Изменить громкость
    progressBarVolume.addEventListener('input', updateRangeVolume);
    // Убрать/Включить громкость
    muteButton.addEventListener('click', function () {
        if (videoPlayer.volume > 0) {
            currentVolume = videoPlayer.volume;
            videoPlayer.volume = 0;
        } else {
            videoPlayer.volume = currentVolume;
        }
    });

    webLinkd.addEventListener('keydown', function (e) {
        console.log(e.target.value);
        console.log(e.key);
        console.log("addOnlineEnter")
        if (e.key == 'Enter') {
            let newOnline = document.createElement('iframe');
            newOnline.setAttribute('src', `${e.target.value}`)
            newOnline.classList.add('videoplayer');
            newOnline.setAttribute('id', 'videoplayer');
            newOnline.setAttribute('frameborder', '0');
            newOnline.setAttribute('allowfullscreen', '');
            newOnline.innerHTML = `<iframe src="${e.target.value}" 
                class='videoplayer'
                id="videoplayer"
                frameborder="0" 
                allowfullscreen>`;
            document.getElementById("video-placeholder").insertBefore(newOnline, document.getElementById("video-placeholder").firstChild);
            console.log('https://rtsp.me/embed/e3kHdzed/');
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('webLinkd');
            deleteButton.setAttribute('id', `'deleteButton${count}'`);
            deleteButton.textContent = 'удалить';
            document.getElementById("video-placeholder").insertBefore(deleteButton, document.getElementById("video-placeholder").firstChild);
            deleteButton.onclick = function () {
                newOnline.remove();
                deleteButton.remove();
            }
            e.target.value ='';
            count++
        }
    });
    webLinkdButton.addEventListener('click', function (e) {
        console.log("addOnlineEnter")
        let newOnline = document.createElement('iframe');
        newOnline.setAttribute('src', `${document.getElementById('webLinkd').value}`)
        newOnline.classList.add('videoplayer');
        newOnline.setAttribute('id', `'videoplayer${count}'`);
        newOnline.setAttribute('frameborder', '0');
        newOnline.setAttribute('allowfullscreen', '');
        newOnline.innerHTML = `<iframe src="${e.target.value}" 
            class='videoplayer'
            id="videoplayer${count}"
            frameborder="0" 
            allowfullscreen>`;
        document.getElementById("video-placeholder").insertBefore(newOnline, document.getElementById("video-placeholder").firstChild);
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('webLinkd');
        deleteButton.setAttribute('id', `'deleteButton${count}'`);
        deleteButton.textContent = 'удалить';
        document.getElementById("video-placeholder").insertBefore(deleteButton, document.getElementById("video-placeholder").firstChild);
        deleteButton.onclick = function () {
            newOnline.remove();
            deleteButton.remove();
        }
        e.target.value ='';
        count++
    });
});
console.log(document.getElementById("addPhoto").addEventListener("change", function (e) {
    let file = e.target.files[0];
    console.log(e.target.files[0].name);
    console.log("Имя загруженного файла")
    let url = URL.createObjectURL(file);
    console.log(url);
    console.log("Бинарная кодировка")
    console.log(e.target.baseURI)
    console.log("Путь к проекту")    
}))