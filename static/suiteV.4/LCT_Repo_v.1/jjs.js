//Получаем объекты
//Плеер
var videoPlayer = document.getElementById('videoplayer');
//Время
var progressBar = document.getElementById('video-hud__progress-bar');
var currTime = document.getElementById('video-hud__curr-time');
var durationTime = document.getElementById('video-hud__duration');
//Кнопки
var actionButton = document.getElementById('video-hud__action');
var muteButton = document.getElementById('video-hud__mute');
var volumeScale = document.getElementById('video-hud__volume');
var speedSelect = document.getElementById('video-hud__speed');
let timeDisplay = document.getElementById("video-hud__duration");
let timeDisplayStart = document.getElementById("video-hud__curr-time");
let fullScreen = document.getElementById("fullScreen");
let addButtonVideo = document.getElementById("addVideo");
let progressBarVolume = document.getElementById("video-hud__volume");

let currentVolume = videoPlayer.volume;
function videoAct() { //Запускаем или ставим на паузу
if(videoPlayer.paused) {
    videoPlayer.play();
    actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_pause');
    console.log("GOOOOOD")
    console.log(document.fullscreenEnabled)
} else {
    videoPlayer.pause();
    actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_play');
}
}   
// Функция для форматирования времени в формате MM:SS
function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

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
}
progressBar.addEventListener('click', function(e) {
    let time = (e.offsetX * videoPlayer.duration)/progressBar.clientWidth;
    progressBar.value = (e.offsetX * 100)/progressBar.clientWidth;
    videoPlayer.currentTime = time;
    progressBar.blur();
});
function addVideoFile(e) {
    let file = e.target.files[0];
    console.log(file);
    let url = URL.createObjectURL(file);

    videoPlayer.src = url;
}
function updateRangeVolume() {
    videoPlayer.volume = this.value/100;
    //100 для того, что бы не было ошибки,
    // т.к. звук изменяется от 0.0 до 1.0
}
function speedFunc() {
    for (let i = 0; i < speedSelect.length; i++) {
        if (speedSelect[i].value && speedSelect[i].selected) {
            console.log(speedSelect[i].value/100);
            document.querySelector('video').playbackRate = speedSelect[i].value/100;
        }
    }
}
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
        muteButton.setAttribute('class','video-hud__element video-hud__volume_off');
        console.log(1);
    } else {
        videoPlayer.volume = currentVolume;
        muteButton.setAttribute('class','video-hud__element video-hud__volume_on');
        console.log(0);
    }
});
speedSelect.addEventListener('change', speedFunc)