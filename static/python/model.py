from ultralytics import YOLO
import cv2
import os


class ModelAPI:
    def __init__(self, model_path):
        self.model = YOLO(model_path)

    def photo_predict(self, img):
        results = self.model(img)
        annotated_img = results[0].plot()
        return annotated_img

    def video_predict(self, video):
        cap = cv2.VideoCapture(video)
        output_file = os.path.join('static/results', "output_video.avi")
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        out = cv2.VideoWriter(output_file, fourcc, 20.0, (640, 480))

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            results = self.model(frame)
            annotated_frame = results[0].plot()
            out.write(annotated_frame)

        cap.release()
        out.release()
        cv2.destroyAllWindows()
        return output_file

    def stream_camera(self):
        cap = cv2.VideoCapture(0)
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            results = self.model(frame)
            annotated_frame = results[0].plot()
            ret, buffer = cv2.imencode('.jpg', annotated_frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        cap.release()
        cv2.destroyAllWindows()
