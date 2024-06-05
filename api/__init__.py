from flask_restful import Api
from .camera_api import CameraAPI
from .photo_api import PhotoAPI
from .video_api import VideoAPI

def initialize_api(app):
    api = Api(app)
    api.add_resource(CameraAPI, '/api/camera')
    api.add_resource(PhotoAPI, '/api/photo')
    api.add_resource(VideoAPI, '/api/video')
