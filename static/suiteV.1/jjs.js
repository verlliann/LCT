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
function videoAct() { //Запускаем или ставим на паузу
if(videoPlayer.paused) {
videoPlayer.play();
actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_play');
console.log("GOOOOOD")
} else {
videoPlayer.pause();
actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_pause');
}
if(durationTime.innerHTML == '00:00') {
durationTime.innerHTML = videoTime(videoPlayer.duration); //Об этой функции чуть ниже
}
}   
//Запуск, пауза
actionButton.addEventListener('click',videoAct);
videoPlayer.addEventListener('click',videoAct);