document.addEventListener("DOMContentLoaded", function() {
    let webLinkd = document.getElementById("webLinkd");
    let webLinkdButton = document.getElementById("webLinkdButton");
    let buttonDialogGet2 = document.getElementById("button_dialog_get_2");
    let dialog1 = document.getElementById("dialog_1");
    let dialog2 = document.getElementById("dialog_2");
    let buttonDialogLink = document.getElementById("button_dialog_link");
    let addButtonPhoto = document.getElementById("addButtonPhoto");
    let addButtonVideo = document.getElementById("addButtonVideo");
    let count = 0;

    function isShow1() { //---ФУНКЦИЯ МЕНЯЕТ КЛАССЫ, Т.Е. СКРЫВАЕТ И ПОКАЗЫВАЕТ ФОРМУ 1 ДИАЛОГОВОГО ОКНА---//
        if (dialog1.classList == 'dialog_1') {
            dialog1.setAttribute('class', 'showDialog1')
        } else {
            dialog1.setAttribute('class', 'dialog_1')
        }
    };
    function isShow2() { //---ФУНКЦИЯ МЕНЯЕТ КЛАССЫ, Т.Е. СКРЫВАЕТ И ПОКАЗЫВАЕТ ФОРМУ 2 ДИАЛОГОВОГО ОКНА---//
        if (dialog2.classList == 'dialog_2') {
            dialog2.setAttribute('class', 'showDialog2')
        } else {
            dialog2.setAttribute('class', 'dialog_2')
        }
    };

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
    //Показать первое диалоговое окно
    webLinkdButton.addEventListener('click', isShow1);
    //Показать второе диалоговое окно
    buttonDialogLink.addEventListener('click', isShow2);
    //Закрыть первое диалоговое окно
    document.getElementById("close1").addEventListener('click', function (e) {
        e.target.parentElement.setAttribute('class', 'showDialog1')
    });
    //Закрыть второе диалоговое окно
    document.getElementById("close2").addEventListener('click', function (e) {
        e.target.parentElement.setAttribute('class', 'showDialog2')
    });
    //Добавление ссылки
    buttonDialogGet2.addEventListener('click', function (e) {
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
    // const fileInputVideo = document.getElementById('addVideo');
    // const fileInputPhoto = document.getElementById('addPhoto');
    // function openWindowWithDelay(url, delayMillis) {
    //     setTimeout(() => {
    //         window.open(url, "_blank");
    //     }, delayMillis);
    //     const html = `<head><meta charset='UTF-8'><title>Test</title></head><body><p>Text.</p></body>`;
    //     window.open('about:blank').document.documentElement.innerHTML = html;
    // }       
    // fileInputVideo.addEventListener('change', (event) => {
    //     const selectedFile = event.target.files[0];
    //     if (selectedFile) {
    //         const fileUrl = URL.createObjectURL(selectedFile);
    //         openWindowWithDelay(fileUrl, 0);
    //     }
    // });
    // fileInputPhoto.addEventListener('change', (event) => {
    //     const selectedFile = event.target.files[0];
    //     if (selectedFile) {
    //         const fileUrl = URL.createObjectURL(selectedFile);
    //         openWindowWithDelay(fileUrl, 0);
    //     }
    // });
    function playSelectedVideo(event) {
        const video = document.getElementById("selectedVideo");
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            video.src = videoURL;
            const html = `<head>
            <meta charset='UTF-8'>
            <title>Test</title>
            </head>
            <body>
            <video id="selectedVideo" src='${videoURL}' autoplay controls></video>
            <a href="${videoURL}" download>Скачать</a>
            </body>`;
                    setTimeout(() => {
                    window.open('about:blank').document.documentElement.innerHTML = html;
            }, 0);
        }
    }
    function playSelectedPhoto(event) {
        const photo = document.getElementById("selectedImage");
        const file = event.target.files[0];
        if (file) {
            const photoURL = URL.createObjectURL(file);
            photo.src = photoURL;
            const html = `<head>
            <meta charset='UTF-8'>
            <title>Test</title>
            </head>
            <body>
            <img id="selectedImage" src="${photoURL}" alt="Выбранное фото">
            <a href="${photoURL}" download>Скачать</a>
            </body>`;
                    setTimeout(() => {
                    window.open('about:blank').document.documentElement.innerHTML = html;
            }, 0);
        }
    }
    document.getElementById("addVideo").addEventListener('change', playSelectedVideo)
    document.getElementById("addPhoto").addEventListener('change', playSelectedPhoto)
});
