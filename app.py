from flask import Flask, render_template, request, redirect, url_for, jsonify, Response, send_from_directory, send_file
from static.python.model import ModelAPI
import cv2
import os
import numpy as np
from io import BytesIO
import zipfile

app = Flask(__name__)

UPLOAD_FOLDER = './static/uploads/'
RESULT_FOLDER = './static/results/'
TXT_FOLDER = './static/txt/'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER
app.config['TXT_FOLDER'] = TXT_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

if not os.path.exists(RESULT_FOLDER):
    os.makedirs(RESULT_FOLDER)

if not os.path.exists(TXT_FOLDER):
    os.makedirs(TXT_FOLDER)

api = ModelAPI("static/python/drone_prediction_model.pt")
fill = []
nums = 0

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/video')
def video():
    return render_template('video.html')


@app.route('/photo')
def photo():
    return render_template('photo.html')


@app.route('/get_photo_data', methods=['GET'])
def get_photo_data():
    global nums
    return jsonify({'num_photos': nums})



@app.route('/download-archive', methods=['GET'])
def download_archive():
    global fill
    print(fill)  # Отладочная информация

    # Создаем объект BytesIO для хранения данных архива в памяти
    buffer = BytesIO()

    # Используем ZipFile для создания архива
    with zipfile.ZipFile(buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        for file_path in fill:
            if os.path.isfile(file_path):
                rel_path = os.path.basename(file_path)
                zip_file.writestr(rel_path, open(file_path, 'rb').read())

    # Переходим в начало буфера
    buffer.seek(0)
    fill = []
    # Отправляем архив клиенту
    return send_file(buffer, as_attachment=True, download_name='archive.zip', mimetype='application/zip')


@app.route('/upload_photo', methods=['POST'])
def upload_photo():
    global nums
    global fill
    file = request.files['photo']
    print(request)
    print(file)
    if file:
        print(f"Received photo: {file.filename}")
        img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
        annotated_img, nums = api.photo_predict(img, file.filename)
        result_path = os.path.join(app.config['RESULT_FOLDER'], file.filename)
        cv2.imwrite(result_path, annotated_img)
        fill.append('./static/txt/' + os.path.basename(result_path)+".txt")
        print(f"Saved annotated photo to: {result_path}")
        print(nums)
        return jsonify({'result_path': url_for('result_file', filename=file.filename)})
    return "No file provided", 400


@app.route('/upload_video', methods=['POST'])
def upload_video():
    global nums
    file = request.files['video']
    if file:
        print(f"Received video: {file.filename}")
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        print(f"Saved video to: {file_path}")
        output_file, nums = api.video_predict(file_path)
        if output_file is None:
            raise ValueError("output_file is None")

        print(f"output_file: {output_file}")
        filename = os.path.basename(output_file)

        return jsonify({'output_file': url_for('result_file', filename=filename)})
    return "No file provided", 400


@app.route('/stream_video')
def stream_video():
    return redirect(url_for('stream'))


@app.route('/stream', methods=['GET'])
def stream():
    return Response(api.stream_camera(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/static/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/static/results/<filename>')
def result_file(filename):
    return send_from_directory(app.config['RESULT_FOLDER'], filename)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)
