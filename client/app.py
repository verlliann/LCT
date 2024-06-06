from flask import Flask, render_template, request, redirect, url_for, jsonify
import requests

app = Flask(__name__)

API_URL = "http://192.168.116.151:80"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload_photo', methods=['POST'])
def upload_photo():
    file = request.files['photo']
    if file:
        files = {'file': file.read()}
        response = requests.post(f"{API_URL}/predict/photo", files=files)
        result = response.json()
        return jsonify(result)
    return "No file provided", 400

@app.route('/upload_video', methods=['POST'])
def upload_video():
    file = request.files['video']
    if file:
        files = {'file': file.read()}
        response = requests.post(f"{API_URL}/predict/video", files=files)
        result = response.json()
        return jsonify(result)
    return "No file provided", 400

@app.route('/stream_video')
def stream_video():
    return redirect(f"{API_URL}/stream")

if __name__ == '__main__':
    app.run(debug=True, port=5001)
