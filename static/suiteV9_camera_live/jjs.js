document.addEventListener("DOMContentLoaded", function() {
    let webLinkd = document.getElementById("webLinkd");
    let webLinkdButton = document.getElementById("webLinkdButton");
    let videoPlaceholders = document.getElementsByClassName('video-placeholder');
    let buttonDialogGet2 = document.getElementById("button_dialog_get_2");
    let dialog1 = document.getElementById("dialog_1");
    let dialog2 = document.getElementById("dialog_2");
    let focus_screen = document.getElementById("focus_screen");
    let focus_screen2 = document.getElementById("focus_screen2");
    let buttonDialogLink = document.getElementById("button_dialog_link");
    let count = 0;
   
    function isShow1() { //Показать, скрыть окно для выбора способа добавления видео
        if (dialog1.classList == 'dialog_1') {
            dialog1.setAttribute('class', 'showDialog1')
            focus_screen.setAttribute('class', 'showFocus_screen')
            focus_screen2.setAttribute('class', 'showFocus_screen2') }
        else {
            dialog1.setAttribute('class', 'dialog_1')
            focus_screen.setAttribute('class', 'focus_screen')
            focus_screen2.setAttribute('class', 'focus_screen') }
    };
    function isShow2() { //Показать, скрыть окно для добавления ссылки
        if (dialog2.classList == 'dialog_2') {
            dialog2.setAttribute('class', 'showDialog2') } 
        else {
            dialog2.setAttribute('class', 'dialog_2')
            dialog1.setAttribute('class', 'showDialog1') } //Скрыть диалоговое окно 1, если открылось 2
    }; 


    // Вызываем функцию updateWebLinkPosition каждый раз, когда добавляется новый videoplayer
buttonDialogGet2.addEventListener('click', function () {
    // ... ваш код для добавления нового videoplayer ...
    // Обновляем позицию weblink
    updateWebLinkPosition();
}); 
    //Создание нового потока
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
    webLinkdButton.addEventListener('click', isShow1);   //Показать первое диалоговое окно
    buttonDialogLink.addEventListener('click', isShow2); //Показать второе диалоговое окно
    document.getElementById("close1").addEventListener('click', function (e) { //Закрыть первое диалоговое окно
        e.target.parentElement.setAttribute('class', 'showDialog1')
        focus_screen.setAttribute('class', 'showFocus_screen')
        focus_screen2.setAttribute('class', 'showFocus_screen2')
    });
    document.getElementById("close2").addEventListener('click', function (e) { //Закрыть второе диалоговое окно
        e.target.parentElement.setAttribute('class', 'showDialog2')
        focus_screen.setAttribute('class', 'showFocus_screen')
        focus_screen2.setAttribute('class', 'showFocus_screen2')
    });
    //Добавление ссылки
    buttonDialogGet2.addEventListener('click', function (e) {
        console.log("addOnlineEnter")
        let newOnline = document.createElement('iframe');
        newOnline.setAttribute('src', `${document.getElementById('webLinkd').value}`)
        newOnline.classList.add('videoplayer');  
        e.target.parentElement.setAttribute('class', 'showDialog2') //Скрыть блюр 
        focus_screen.setAttribute('class', 'showFocus_screen')      //и диалоговое окно после
        focus_screen2.setAttribute('class', 'showFocus_screen2')    //добавления камеры
        newOnline.setAttribute('id', `'videoplayer${count}'`);
        newOnline.setAttribute('frameborder', '0');
        newOnline.setAttribute('allowfullscreen', '');
        newOnline.innerHTML = `<iframe src="${e.target.value}" 
            class='videoplayer'
            id="videoplayer${count}"
            frameborder="0" 
            allowfullscreen>`;
        document.getElementById("video-placeholder").insertBefore(newOnline, document.getElementById("video-placeholder").firstChild);
        let deleteButton = document.createElement('img');
        deleteButton.classList.add('close_cam');
        deleteButton.setAttribute('id', `'deleteButton${count}'`);
        deleteButton.setAttribute('src', '2/close.png');
        newOnline.innerHTML = `<img src="2/close.png"
        class='close_cam'
        id="deleteButton${count}" src="'2/close.png'">`;
        document.getElementById("video-placeholder").insertBefore(deleteButton, document.getElementById("video-placeholder").firstChild);
        deleteButton.onclick = function () {
            newOnline.remove();
            deleteButton.remove();
        }
        e.target.value ='';
        count++
    });
});