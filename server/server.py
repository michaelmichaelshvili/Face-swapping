from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
from haarcascade import *
import numpy as np

app = Flask(__name__)
CORS(app)
import numpy as np


@app.post("/extractFaces")
def extract_faces():
    req = request
    # images = [req.files['mainImage']]  # main image
    # for i in range(len(req.files) - 1):
    #     images.append(req.files[f'replaceImage-{i}'])
    all_rects = extract_faces_from_images_files(req.files)
    print(all_rects)
    return jsonify(all_rects)


if __name__ == '__main__':
    app.run()
