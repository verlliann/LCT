document.addEventListener("DOMContentLoaded", function() {
    const addCameraBtn = document.getElementById("addCameraBtn");
    const addCameraModal = document.getElementById("addCameraModal");
    const closeBtn = document.querySelector(".closeBtn");
    const addCameraForm = document.getElementById("addCameraForm");
    const cameraList = document.getElementById("cameraList");
    const videoCanvas = document.getElementById("videoCanvas");
    const ctx = videoCanvas.getContext('2d');
    let mjpegImg = null;

    // Load cameras from localStorage
    loadCameras();

    addCameraBtn.addEventListener("click", function() {
        addCameraModal.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        addCameraModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == addCameraModal) {
            addCameraModal.style.display = "none";
        }
    });

    addCameraForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const cameraName = document.getElementById("cameraName").value;
        const cameraIP = document.getElementById("cameraIP").value;
        const cameraPort = document.getElementById("cameraPort").value;

        addCamera(cameraName, cameraIP, cameraPort);
        addCameraModal.style.display = "none";
        addCameraForm.reset();
    });

    function addCamera(name, ip, port) {
        const cameraElement = document.createElement("div");
        cameraElement.classList.add("camera");

        const cameraInfo = document.createElement("button");
        cameraInfo.innerText = `${name} (${ip}:${port})`;
        cameraInfo.addEventListener("click", function() {
            playVideo(ip, port);
        });
        cameraElement.appendChild(cameraInfo);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteCameraBtn");
        deleteButton.innerText = "Удалить";
        deleteButton.addEventListener("click", function() {
            cameraList.removeChild(cameraElement);
            removeCameraFromStorage(name);
        });
        cameraElement.appendChild(deleteButton);

        cameraList.appendChild(cameraElement);
        saveCameraToStorage(name, ip, port);
    }

    function playVideo(ip, port) {
        if (mjpegImg) {
            mjpegImg.remove();
        }
        const videoUrl = `http://${ip}:${port}/mjpg/1/video.mjpg`;
        mjpegImg = new Image();
        mjpegImg.src = videoUrl;
        mjpegImg.onload = function() {
            videoCanvas.width = mjpegImg.width;
            videoCanvas.height = mjpegImg.height;
            draw();
        }
    }

    function draw() {
        if (mjpegImg) {
            ctx.drawImage(mjpegImg, 0, 0, videoCanvas.width, videoCanvas.height);
            requestAnimationFrame(draw);
        }
    }

    function saveCameraToStorage(name, ip, port) {
        const cameras = JSON.parse(localStorage.getItem("cameras")) || [];
        cameras.push({ name, ip, port });
        localStorage.setItem("cameras", JSON.stringify(cameras));
    }

    function loadCameras() {
        const cameras = JSON.parse(localStorage.getItem("cameras")) || [];
        cameras.forEach(camera => {
            addCamera(camera.name, camera.ip, camera.port);
        });
    }

    function removeCameraFromStorage(name) {
        const cameras = JSON.parse(localStorage.getItem("cameras")) || [];
        const updatedCameras = cameras.filter(camera => camera.name !== name);
        localStorage.setItem("cameras", JSON.stringify(updatedCameras));
    }

    // Sort table functionality
    window.sortTable = function(columnIndex) {
        const table = document.querySelector(".event-log table");
        const tbody = table.querySelector("tbody");
        const rows = Array.from(tbody.querySelectorAll("tr"));
        const sortedRows = rows.sort((a, b) => {
            const cellA = a.children[columnIndex].innerText;
            const cellB = b.children[columnIndex].innerText;
            return cellA.localeCompare(cellB);
        });
        tbody.innerHTML = "";
        sortedRows.forEach(row => tbody.appendChild(row));
    };
});
