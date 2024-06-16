FROM nvidia/cuda:12.2.0-devel-ubuntu22.04
# FROM nvidia/cuda:12.5-base

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    python3 \
    python3-pip \
    curl

RUN ln -s /usr/bin/python3 /usr/bin/python

RUN distribution=$(. /etc/os-release;echo $ID$VERSION_ID) \
    && curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | apt-key add - \
    && curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | tee /etc/apt/sources.list.d/nvidia-docker.list \
    && apt-get update && apt-get install -y nvidia-docker2


ENV DEBIAN_FRONTEND=noninteractive

# Предварительно задайте значения для пакетов, требующих интерактивного ввода
RUN echo 'nvidia-driver-535 nvidia-driver-535/country select US' | debconf-set-selections
RUN apt-get install nvidia-driver-535 -y

# Create app directory
WORKDIR /app

# Install app dependencies
COPY requirements.txt ./

RUN pip install --upgrade pip

RUN pip install -r requirements.txt


COPY . .

RUN rm -rf /var/lib/apt/lists/*

ENV FLASK_APP=app.py

EXPOSE 80

CMD [ "python","app.py"]   
 

# CMD [ "flask", "run","--host","0.0.0.0","--port","80"]        
# alpine install libgl1-mesa-glx
# RUN apk add mesa-gl