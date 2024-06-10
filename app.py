from flask import Flask, render_template, request, redirect, url_for
from config import Config
from models import db, Camera
from api import initialize_api

app = Flask(__name__, template_folder='static/suiteV.5')
app.config.from_object(Config)
db.init_app(app)
initialize_api(app)

@app.route('/')
def index():
    cameras = Camera.query.all()
    return render_template('LCT_Repo/2.html', cameras=cameras)

@app.route('/add_camera', methods=['POST'])
def add_camera():
    name = request.form.get('cameraName')
    ip_address = request.form.get('cameraIP')
    port = request.form.get('cameraPort')
    new_camera = Camera(name=name, ip_address=ip_address, port=port)
    db.session.add(new_camera)
    db.session.commit()
    return redirect(url_for('index'))

@app.route('/photos')
def photos():
    return render_template('photos.html')

@app.route('/videos')
def videos():
    return render_template('videos.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=8080)  # Use a different port

