FROM python:3.12-slim
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx

# Create app directory
WORKDIR /app

# Install app dependencies
COPY requirements.txt ./

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxrender1 \
    libxext6

# Bundle app source
# RUN pip install --upgrade pip && pip install -r requirements.txt
# удалить кэш после сборки
COPY . .

ENV FLASK_APP=app.py

EXPOSE 80

CMD [ "python","app.py"]   
 

# CMD [ "flask", "run","--host","0.0.0.0","--port","80"]        
# alpine install libgl1-mesa-glx
# RUN apk add mesa-gl