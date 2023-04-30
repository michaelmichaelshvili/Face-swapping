import cv2

# Loading the required haar-cascade xml classifier file
haar_cascade = cv2.CascadeClassifier(r'C:\Users\micha\PycharmProjects\Face-swapping\haarcascade_frontalface_default.xml')

def extract_faces_rects(img):
    img = cv2.imread(img)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return haar_cascade.detectMultiScale(gray_img, 1.1, 9)
