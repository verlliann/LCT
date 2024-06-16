document.addEventListener("DOMContentLoaded", function() {
    let webLinkdButton = document.getElementById("webLinkdButton");
    let buttonDialogGet2 = document.getElementById("button_dialog_get_2");
    let dialog1 = document.getElementById("dialog_1");
    let dialog2 = document.getElementById("dialog_2");
    let focus_screen = document.getElementById("focus_screen");
    let focus_screen2 = document.getElementById("focus_screen2");
    let buttonDialogLink = document.getElementById("button_dialog_link");
    let count = 0;
    let objec = {
        videoplayer: [],
        videoplayerCount: 0,
        videoplayerId: [0],
        imageId: ["0"],
        frame_for_enter: ["0"],
        frame_for_close: ["0"],
        name_cam_enter: ["0"],
        webText: [""],
        full_screen: [""],
        loadbar: ["0"],
        videoplayerStorage: []
    };
    
    function isShow1() {
        if (dialog1.classList == 'dialog_1') {
            dialog1.setAttribute('class', 'showDialog1')
            focus_screen.setAttribute('class', 'showFocus_screen')
            focus_screen2.setAttribute('class', 'showFocus_screen2') }
        else {
            dialog1.setAttribute('class', 'dialog_1')
            focus_screen.setAttribute('class', 'focus_screen')
            focus_screen2.setAttribute('class', 'focus_screen') }
    };
    function isShow2() {
        if (dialog2.classList == 'dialog_2') {
            dialog2.setAttribute('class', 'showDialog2') } 
        else {
            dialog2.setAttribute('class', 'dialog_2')
            dialog1.setAttribute('class', 'showDialog1') }
    }; 
    function closeFirst(e) {
         e.target.parentElement.setAttribute('class', 'showDialog1')
         focus_screen.setAttribute('class', 'showFocus_screen')
         focus_screen2.setAttribute('class', 'showFocus_screen2') 
    };
    function closeSecond(e) {
         e.target.parentElement.setAttribute('class', 'showDialog2')
         focus_screen.setAttribute('class', 'showFocus_screen')
         focus_screen2.setAttribute('class', 'showFocus_screen2') 
    };
    function cycle(e) {
        e.target.parentElement.setAttribute('class', 'showDialog2')
        focus_screen.setAttribute('class', 'showFocus_screen')
        focus_screen2.setAttribute('class', 'showFocus_screen2') 
        
        let full_screen = document.createElement('img'); 
        full_screen.classList.add('full_screen'); 
        full_screen.setAttribute('src', '/static/images/full_screen.png');
        let frame_for_enter = document.createElement('div');
        frame_for_enter.classList.add('frame_for_enter');
        frame_for_enter.setAttribute('id', `'frame_for_enter${count}'`);
        document.getElementById("video-placeholder").insertBefore(frame_for_enter, document.getElementById("video-placeholder").firstChild);
        let frame_for_close = document.createElement('div');
        frame_for_close.classList.add('frame_for_close');
        frame_for_close.setAttribute('id', `'frame_for_close${count}'`);
        document.getElementById("video-placeholder").insertBefore(frame_for_close, document.getElementById("video-placeholder").firstChild);
        let name_cam_enter = document.createElement('input');
        name_cam_enter.classList.add('name_cam_enter'); 
        name_cam_enter.setAttribute('type', 'text');
        name_cam_enter.setAttribute('id',  `'name_cam_enter${count}'`);
        document.getElementById("video-placeholder").insertBefore(name_cam_enter, document.getElementById("video-placeholder").firstChild);
        let deleteButton = document.createElement('img');
        deleteButton.classList.add('close_cam');
        deleteButton.setAttribute('src', '/static/images/close.png');
        let newOnline = document.createElement('iframe');
        newOnline.classList.add('videoplayer');  
        newOnline.setAttribute('frameborder', '0');
        newOnline.setAttribute('allowfullscreen', '');
        let loadbar = document.createElement('div'); 
        loadbar.classList.add('loadbar'); 
        loadbar.setAttribute('src', '2/full_screen.png');
        focus_screen.setAttribute('class', 'showFocus_screen')
        focus_screen2.setAttribute('class', 'showFocus_screen2')
        localStorage.setItem('productCard', JSON.stringify(objec))
        objec.videoplayer.push(`${document.getElementById('webLinkd').value}`)
        localStorage.setItem('productCard', JSON.stringify(objec))
        objec.videoplayerId.push(JSON.parse(localStorage.getItem('productCard')).videoplayerId[count+1])
        objec.imageId[count] = `${count}`
        objec.frame_for_enter[count] = `${count}`
        objec.frame_for_close[count] = `${count}`
        objec.name_cam_enter[count] = `${count}`
        objec.videoplayerCount = Number(objec.videoplayerCount) + 1
        objec.webText[count] = `${e.srcElement.previousElementSibling.value}`
        objec.full_screen[count] = `${count}`
        objec.loadbar[count] = `${count}`
        localStorage.setItem('productCard', JSON.stringify(objec))
        full_screen.setAttribute('id', `'full_screen${objec.videoplayerCount-1}'`); 
        deleteButton.setAttribute('id', `'deleteButton${objec.videoplayerCount-1}'`);
        newOnline.setAttribute('src', `${objec.videoplayer[count]}`)
        newOnline.setAttribute('id', `'videoplayer${objec.videoplayerCount-1}'`);
        loadbar.setAttribute('id', `'loadbar${objec.loadbar[count]}'`);
        full_screen.hidden = true
        frame_for_enter.hidden = true
        frame_for_close.hidden = true
        name_cam_enter.hidden = true
        deleteButton.hidden = true
        newOnline.hidden = true
        document.getElementById("video-placeholder").insertBefore(full_screen, document.getElementById("video-placeholder").firstChild);
        document.getElementById("video-placeholder").insertBefore(loadbar, document.getElementById("video-placeholder").firstChild);
        document.getElementById("video-placeholder").insertBefore(frame_for_enter, document.getElementById("video-placeholder").firstChild);
        document.getElementById("video-placeholder").insertBefore(frame_for_close, document.getElementById("video-placeholder").firstChild);
        document.getElementById("video-placeholder").insertBefore(name_cam_enter, document.getElementById("video-placeholder").firstChild);
        document.getElementById("video-placeholder").insertBefore(deleteButton, document.getElementById("video-placeholder").firstChild);
        document.getElementById("video-placeholder").insertBefore(newOnline, document.getElementById("video-placeholder").firstChild);
        newOnline.addEventListener('load', function (e) {
            document.getElementById(`'loadbar${count-1}'`).hidden = true
            full_screen.hidden = false
            frame_for_enter.hidden = false
            frame_for_close.hidden = false
            name_cam_enter.hidden = false
            deleteButton.hidden = false
            newOnline.hidden = false
            loadbar.hidden = true
        }, true)
        count++
        full_screen.onclick = function (e) {
            try {
                e.target.previousElementSibling.previousElementSibling.contentWindow.frameElement != "object"
            } catch (error) {
                e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.requestFullscreen()
            }
        }
        deleteButton.onclick = function (e) {
            storedObj = localStorage.getItem('productCard')
            storedObj = JSON.parse(storedObj)
            let indexToDelete = e.target.id
            indexToDelete = indexToDelete.replace(/[^+\d]/g, '')
            if (indexToDelete !== -1) {
                storedObj.loadbar.splice(indexToDelete, 1)
                document.getElementById(`'loadbar${indexToDelete}'`).remove()
                storedObj.full_screen.splice(indexToDelete, 1)
                document.getElementById(`'full_screen${indexToDelete}'`).remove()
                storedObj.webText.splice(indexToDelete, 1)
                storedObj.videoplayer.splice(indexToDelete, 1)
                document.getElementById(`'videoplayer${indexToDelete}'`).remove()
                storedObj.videoplayerId.splice(indexToDelete, 1)
                document.getElementById(e.target.id).remove()
                storedObj.imageId.splice(indexToDelete, 1)
                storedObj.videoplayerCount = storedObj.videoplayerCount - 1
                storedObj.frame_for_enter.splice(indexToDelete, 1)
                document.getElementById(`'frame_for_enter${indexToDelete}'`).remove()
                storedObj.frame_for_close.splice(indexToDelete, 1)
                document.getElementById(`'frame_for_close${indexToDelete}'`).remove()
                storedObj.name_cam_enter.splice(indexToDelete, 1)
                document.getElementById(`'name_cam_enter${indexToDelete}'`).remove()
                localStorage.setItem('productCard', JSON.stringify(storedObj))
            }
        }
        console.log(JSON.parse(localStorage.getItem('productCard')));
        console.log(objec.videoplayerCount + " поток(а)(ов) и цикл");
        document.getElementById('video-placeholder').childNodes[2].value = String(webText.value)
    };
    window.onload = function(e) {
        if (JSON.parse(localStorage.getItem('productCard'))==null) {
            console.log("Нет потоков")
        } else {
            let storageObj = JSON.parse(localStorage.getItem('productCard'))
            for (let i = 0; i < Number(storageObj.videoplayerCount); i++) {
                let full_screen = document.createElement('img'); 
                full_screen.classList.add('full_screen'); 
                full_screen.setAttribute('src', '/static/images/full_screen.png');
                let frame_for_enter = document.createElement('div');
                frame_for_enter.classList.add('frame_for_enter');
                let frame_for_close = document.createElement('div');
                frame_for_close.classList.add('frame_for_close');
                let name_cam_enter = document.createElement('input');
                name_cam_enter.classList.add('name_cam_enter'); 
                name_cam_enter.setAttribute('type', 'text');
                let deleteButton = document.createElement('img');
                deleteButton.classList.add('close_cam');
                deleteButton.setAttribute('src', '/static/images/close.png');
                let newOnline = document.createElement('iframe');
                newOnline.classList.add('videoplayer');  
                newOnline.setAttribute('frameborder', '0');
                newOnline.setAttribute('allowfullscreen', '');
                let loadbar = document.createElement('div'); 
                loadbar.classList.add('loadbar'); 
                loadbar.setAttribute('src', '2/full_screen.png');
                focus_screen.setAttribute('class', 'showFocus_screen')
                focus_screen2.setAttribute('class', 'showFocus_screen2')
                objec.videoplayer.push(JSON.parse(localStorage.getItem('productCard')).videoplayer[i])
                objec.videoplayerId.push(JSON.parse(localStorage.getItem('productCard')).videoplayerId[i])
                objec.imageId[count] = `${count}`
                objec.frame_for_enter[count] = `${count}`
                objec.frame_for_close[count] = `${count}`
                objec.name_cam_enter[count] = `${count}`
                objec.videoplayerCount = JSON.parse(localStorage.getItem('productCard')).videoplayerCount
                objec.full_screen[count] = `${count}`
                objec.loadbar[count] = `${count}`
                localStorage.setItem('productCard', JSON.stringify(objec))
                deleteButton.setAttribute('id', `'deleteButton${i}'`);
                newOnline.setAttribute('src', `${storageObj.videoplayer[i]}`)
                newOnline.setAttribute('id', `'videoplayer${i}'`);
                loadbar.setAttribute('id', `'loadbar${i}'`);
                frame_for_enter.setAttribute('id', `'frame_for_enter${i}'`);
                frame_for_close.setAttribute('id', `'frame_for_close${i}'`);
                name_cam_enter.setAttribute('id',  `'name_cam_enter${i}'`);
                name_cam_enter.setAttribute('value',  `${String(storageObj.webText[i])}`);
                full_screen.setAttribute('id', `'full_screen${i}'`)
                full_screen.hidden = true
                frame_for_enter.hidden = true
                frame_for_close.hidden = true
                name_cam_enter.hidden = true
                deleteButton.hidden = true
                newOnline.hidden = true
                document.getElementById("video-placeholder").insertBefore(full_screen, document.getElementById("video-placeholder").firstChild);
                document.getElementById("video-placeholder").insertBefore(loadbar, document.getElementById("video-placeholder").firstChild);
                document.getElementById("video-placeholder").insertBefore(frame_for_enter, document.getElementById("video-placeholder").firstChild);
                document.getElementById("video-placeholder").insertBefore(frame_for_close, document.getElementById("video-placeholder").firstChild);
                document.getElementById("video-placeholder").insertBefore(name_cam_enter, document.getElementById("video-placeholder").firstChild);
                document.getElementById("video-placeholder").insertBefore(deleteButton, document.getElementById("video-placeholder").firstChild);
                document.getElementById("video-placeholder").insertBefore(newOnline, document.getElementById("video-placeholder").firstChild);
                newOnline.addEventListener('load', function (e) {
                    document.getElementById(`'loadbar${i}'`).hidden = true
                    full_screen.hidden = false
                    frame_for_enter.hidden = false
                    frame_for_close.hidden = false
                    name_cam_enter.hidden = false
                    deleteButton.hidden = false
                    newOnline.hidden = false
                    loadbar.hidden = true
                }, true)
                full_screen.onclick = function (e) {
                    try {
                        e.target.previousElementSibling.previousElementSibling.contentWindow.frameElement != "object"
                    } catch (error) {
                        console.log(e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.requestFullscreen())
                        e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.requestFullscreen()
                    } finally {
                        
                    }
                }
                deleteButton.onclick = function (e) {
                    let storageObject = localStorage.getItem('productCard')
                    storageObject = JSON.parse(storageObject)
                    console.log(storageObject)
                    let indexToDelete = e.target.id
                    console.log(document.getElementById(e.target.id))
                    indexToDelete = indexToDelete.replace(/[^+\d]/g, '')
                    console.log(indexToDelete)
                    if (indexToDelete !== -1) {
                        storageObj.loadbar.splice(indexToDelete, 1)
                        document.getElementById(`'loadbar${indexToDelete}'`).remove()
                        storageObj.webText.splice(indexToDelete, 1)
                        storageObj.frame_for_enter.splice(indexToDelete, 1)
                        document.getElementById(`'frame_for_enter${indexToDelete}'`).remove()
                        storageObj.frame_for_close.splice(indexToDelete, 1)
                        document.getElementById(`'frame_for_close${indexToDelete}'`).remove()
                        storageObj.name_cam_enter.splice(indexToDelete, 1)
                        document.getElementById(`'name_cam_enter${indexToDelete}'`).remove()
                        storageObj.videoplayer.splice(indexToDelete, 1)
                        document.getElementById(`'videoplayer${indexToDelete}'`).remove()
                        storageObj.videoplayerId.splice(indexToDelete, 1)
                        document.getElementById(e.target.id).remove()
                        storageObj.imageId.splice(indexToDelete, 1)
                        storageObj.full_screen.splice(indexToDelete, 1)
                        document.getElementById(`'full_screen${indexToDelete}'`).remove()
                        storageObj.videoplayerCount = storageObj.videoplayerCount - 1
                        console.log(JSON.stringify(storageObj))
                        localStorage.setItem('productCard', JSON.stringify(storageObj))
                    }
                }
            }
            localStorage.setItem('productCard', JSON.stringify(storageObj))
        }
    }
    webLinkdButton.addEventListener('click', isShow1);
    buttonDialogLink.addEventListener('click', isShow2);
    document.getElementById("close1").addEventListener('click', closeFirst);
    document.getElementById("close2").addEventListener('click', closeSecond);
    buttonDialogGet2.addEventListener('click', cycle);
    var scrollTopButton = document.getElementById('scroll-top');
    function showScrollTop() {
      if (window.scrollY > 200) {
        scrollTopButton.classList.add('visible');
      } else {
        scrollTopButton.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', showScrollTop);
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    scrollTopButton.addEventListener('click', scrollToTop);
    logo_go_me2.addEventListener('click', function() {
        window.open('/');
      });
    logo_go_me1.addEventListener('click', function() {
        window.open('/');
      });
});
