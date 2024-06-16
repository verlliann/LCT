from ultralytics import YOLO
import cv2
import os

nums = 0

def texts(results, image_height, image_width):
    global nums
    yolo_data = []
    for result in results:
        detection_count = result.boxes.shape[0]
        for i in range(detection_count):
            nums += 1
            cls = int(result.boxes.cls[i].item())
            bounding_box = result.boxes.xyxy[i].cpu().numpy()
            x = float(bounding_box[0] / image_width)
            y = float(bounding_box[1] / image_height)
            width = float((bounding_box[2] - bounding_box[0]) / image_width)
            height = float((bounding_box[3] - bounding_box[1]) / image_height)
            yolo_data.append(f"{float(cls)} {x} {y} {width} {height}")

    return yolo_data, nums

class ModelAPI:
    def __init__(self, model_path):
        self.model = YOLO(model_path)

    def photo_predict(self, img, file_path):
        global nums
        results = self.model(img)
        height, width = img.shape[:2]
        data_txt, nums = texts(results, height, width)
        with open(f'static/txt/{file_path}.txt', 'w') as file:
            for line in data_txt:
                file.write(line + '\n')
        annotated_img = results[0].plot()
        return annotated_img, nums

    def video_predict(self, video):
        global nums
        nums = 0
        data_txt = []
        if not os.path.isfile(video):
            print(f"Ошибка: Видео файл {video} не существует.")
            return None

        cap = cv2.VideoCapture(video)
        if not cap.isOpened():
            print(f"Ошибка: Невозможно открыть видео файл {video}.")
            return None

        output_dir = 'static/results/'
        os.makedirs(output_dir, exist_ok=True)
        output_file = os.path.join(output_dir, os.path.basename(video))

        fourcc = cv2.VideoWriter_fourcc(*'VP80')
        out = cv2.VideoWriter(output_file, fourcc, 20.0, (1280, 720))
        if not out.isOpened():
            print(f"Ошибка: Невозможно открыть выходной файл {output_file} для записи.")
            return None

        frame_count = 0
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            results = self.model(frame)
            height, width = frame.shape[:2]
            ann_img, nums = texts(results, height, width)
            data_txt.append(ann_img)
            annotated_frame = results[0].plot()
            out.write(annotated_frame)
            frame_count += 1

        with open(f'static/txt/{os.path.basename(video)}.txt', 'w') as file:
            for line in data_txt:
                for lines in line:
                    file.write(lines + '\n')
        cap.release()
        out.release()
        cv2.destroyAllWindows()

        if frame_count == 0:
            print("Предупреждение: Ни один кадр не был обработан.")
        else:
            print(f"Обработка завершена. Всего обработано кадров: {frame_count}")
        return output_file, nums

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
