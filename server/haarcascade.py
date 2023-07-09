import cv2
import numpy as np

# Loading the required haar-cascade xml classifier file
haar_cascade = cv2.CascadeClassifier(r'C:\Users\micha\PycharmProjects\Face-swapping\server\haarcascade_frontalface_default.xml')


def extract_face_rects(img) -> list[int]:
    """

    :param img: image where we search for face(s)
    :return: Array(s) of (x,y,w,h)
    """
    # img = cv2.imread(img)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    rects = haar_cascade.detectMultiScale(gray_img, 1.1, 9)
    if (type(rects) is tuple):
        return []
    return rects.tolist()


def extract_faces_from_images_files(images_files) -> dict:
    all_rects = {}
    for name in images_files:
        img_file = images_files.get(name)
        encode_img = cv2.imdecode(np.fromstring(img_file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
        all_rects[name] = extract_face_rects(encode_img)
    return all_rects
