# LCT

### Развертывание
Клонирование репозитория
```bash
git clone https://github.com/verlliann/LCT.git
```

В связи с ограничение размера загрузчки файлов на GitHub. Необходимо скачать модель по адресу https://disk.yandex.ru/d/qU_n3h_2Rd8WEw.

После скачивания требуется разархивировать архив.
```bash
unzip lct23_AlpsSearch.zip 
```

Перенести файл drone.pt в каталог проекта по адресу ./static/python 
```bash
mv drone.pt ./static/python 
```

Сборка Dockerfile
```bash
sudo docker build -t lct_cuda08 .
```

Развертывание контейнера
```bash
sudo docker run --gpus all -p 80:80 --name=lct_cuda08 lct_cuda08
```


