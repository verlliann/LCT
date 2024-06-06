from flask import Flask, request, jsonify, Response, render_template
from ultralytics import YOLO
import cv2
import numpy as np

app = Flask(__name__)
model = YOLO("drone_detection.pt")

class ModelAPI:
    @staticmethod
    def photo_predict(model, img):
        results = model(img)
        predictions = []
        for result in results:
            for box in result.boxes:
                predictions.append({
                    'bbox': box.xyxy[0].tolist(),
                    'confidence': box.conf.tolist(),
                    'class': box.cls.tolist()
                })
        return predictions

    @staticmethod
    def video_predict(model, video):
        cap = cv2.VideoCapture(video)
        output_file = "static/results/output_video.avi"
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        out = cv2.VideoWriter(output_file, fourcc, 20.0, (640, 480))

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            results = model(frame)
            annotated_frame = results[0].plot()
            out.write(annotated_frame)

        cap.release()
        out.release()
        cv2.destroyAllWindows()
        return output_file

    @staticmethod
    def stream_camera(model):
        cap = cv2.VideoCapture(0)
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            results = model(frame)
            annotated_frame = results[0].plot()
            ret, buffer = cv2.imencode('.jpg', annotated_frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        cap.release()
        cv2.destroyAllWindows()

api = ModelAPI()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict/photo', methods=['POST'])
def predict_photo():
    if 'file' not in request.files:
        return "No file provided", 400
    file = request.files['file']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    results = api.photo_predict(model, img)
    return jsonify({'predictions': results})

@app.route('/predict/video', methods=['POST'])
def predict_video():
    if 'file' not in request.files:
        return "No file provided", 400
    file = request.files['file']
    file.save('input_video.mp4')
    output_file = api.video_predict(model, 'input_video.mp4')
    return jsonify({'output_file': output_file})

@app.route('/stream', methods=['GET'])
def stream_video():
    return Response(api.stream_camera(model),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
