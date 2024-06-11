from ultralytics import YOLO
import cv2

model = YOLO("drone_detection.pt")
file = input('Введите ссылку на фото или видео: ')


class ModelAPI:
    def __init__(self, file):
        self.file = file

    @staticmethod
    def photo_predict(model, img):
        results = model(img)
        for result in results:
            result.show()
            result.save(filename="result.jpg")

    @staticmethod
    def video_predict(model, video):
        cap = cv2.VideoCapture(video)
        while cap.isOpened():
            ret, frame = cap.read()
            results = model(frame)
            annotated_frame = results[0].plot()
            cv2.imshow('YOLOv8 Processed Video', annotated_frame)
            # Уменьшаем задержку для увеличения FPS
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

    def run(self):
        if self.file[-4:] == '.mp4':
            self.video_predict(model, self.file)
        else:
            self.photo_predict(model, self.file)


obj = ModelAPI(file)
obj.run()
