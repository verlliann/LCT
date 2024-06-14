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
        # Проверка существования входного видеофайла
        if not os.path.isfile(video):
            print(f"Ошибка: Видео файл {video} не существует.")
            return None

        cap = cv2.VideoCapture(video)

        # Проверка успешного открытия видео
        if not cap.isOpened():
            print(f"Ошибка: Невозможно открыть видео файл {video}.")
            return None

        # Подготовка выходного файла и директории
        output_dir = 'static/results/'
        os.makedirs(output_dir, exist_ok=True)
        output_file = os.path.join(output_dir, os.path.basename(video))

        # Инициализация VideoWriter
        fourcc = cv2.VideoWriter_fourcc(*'H264')
        out = cv2.VideoWriter(output_file, fourcc, 20.0, (640, 480))

        if not out.isOpened():
            print(f"Ошибка: Невозможно открыть выходной файл {output_file} для записи.")
            return None

        frame_count = 0
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            results = self.model(frame)
            annotated_frame = results[0].plot()

            # Проверка размеров кадра
            if annotated_frame.shape[1] != 640 or annotated_frame.shape[0] != 480:
                print(
                    f"Предупреждение: Размер кадра {annotated_frame.shape} не соответствует ожидаемому (640, 480). Изменение размера кадра.")
                annotated_frame = cv2.resize(annotated_frame, (640, 480))

            out.write(annotated_frame)
            frame_count += 1

        cap.release()
        out.release()
        cv2.destroyAllWindows()

        if frame_count == 0:
            print("Предупреждение: Ни один кадр не был обработан.")
        else:
            print(f"Обработка завершена. Всего обработано кадров: {frame_count}")

        print(f"Выходной файл сохранен в {output_file}")
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