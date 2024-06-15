from flask import Flask, render_template, request, redirect, url_for, jsonify, Response, send_from_directory
from static.python.model import ModelAPI
import cv2
import os
import numpy as np
"""import boto3
session = boto3.session.Session()
s3 = session.client(
    service_name='s3',
    endpoint_url='http://192.168.50.253:9000',
    aws_access_key_id='ycGENBV4Kj1mtuMUGntC',
    aws_secret_access_key='Qz33HbdT2fvwNJX8lMUwc353uacFWqOWwYjP975w'
)"""

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads/'
RESULT_FOLDER = 'static/results/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

if not os.path.exists(RESULT_FOLDER):
    os.makedirs(RESULT_FOLDER)

api = ModelAPI("static/python/drone_prediction_model.pt")


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/video')
def video():
    return render_template('video.html')


@app.route('/photo')
def photo():
    return render_template('photo.html')


@app.route('/upload_photo', methods=['POST'])
def upload_photo():
    file = request.files['photo']
    print(file)
    if file:
        print(f"Received photo: {file.filename}")
        img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
        annotated_img = api.photo_predict(img, file.filename)
        result_path = os.path.join(app.config['RESULT_FOLDER'], file.filename)
        cv2.imwrite(result_path, annotated_img)
        #s3.upload_file(result_path, 'lct', file.filename)
        print(f"Saved annotated photo to: {result_path}")
        return jsonify({'result_path': url_for('result_file', filename=file.filename)})
    return "No file provided", 400


@app.route('/upload_video', methods=['POST'])
def upload_video():
    file = request.files['video']
    if file:
        print(f"Received video: {file.filename}")
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        print(f"Saved video to: {file_path}")
        output_file = api.video_predict(file_path)
        print(f"Processed video saved to: {output_file}")
        return jsonify({'output_file': url_for('result_file', filename=output_file.split('/')[2])})
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
