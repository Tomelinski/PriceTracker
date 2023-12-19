import os

class Config:
    DEBUG = True
    SECRET_KEY = os.environ.get('SECRET')
    FLASK_RUN_HOST = os.environ.get('FLASK_RUN_HOST', 'localhost')
    FLASK_RUN_PORT = int(os.environ.get('FLASK_RUN_PORT', 8088))