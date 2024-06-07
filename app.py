from flask import Flask, render_template, request, redirect, url_for, jsonify, Response, send_from_directory
from static.python.model import ModelAPI
import cv2
import os
import numpy as np

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads/'
RESULT_FOLDER = 'static/results/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

if not os.path.exists(RESULT_FOLDER):
    os.makedirs(RESULT_FOLDER)

api = ModelAPI("drone_detection.pt")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload_photo', methods=['POST'])
def upload_photo():
    file = request.files['photo']
    if file:
        img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
        annotated_img = api.photo_predict(img)
        result_path = os.path.join(app.config['RESULT_FOLDER'], 'result.jpg')
        cv2.imwrite(result_path, annotated_img)
        return jsonify({'result_path': result_path})
    return "No file provided", 400

@app.route('/upload_video', methods=['POST'])
def upload_video():
    file = request.files['video']
    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], 'input_video.mp4')
        file.save(file_path)
        output_file = api.video_predict(file_path)
        return jsonify({'output_file': output_file})
    return "No file provided", 400

@app.route('/stream_video')
def stream_video():
    return redirect(url_for('stream'))

@app.route('/stream', methods=['GET'])
def stream():
    return Response(api.stream_camera(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/static/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/static/results/<filename>')
def result_file(filename):
    return send_from_directory(app.config['RESULT_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)
