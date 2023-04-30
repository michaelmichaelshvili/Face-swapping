import os
import cv2
import matplotlib.pyplot as plt
data_path = '../Data/WIDER_train/images'
sizes = set()
for dir in os.listdir(data_path):
    for img_path in os.listdir(os.path.join(data_path, dir)):
        img = cv2.imread(os.path.join(data_path, dir, img_path))
        sizes.add(img.shape)
print(sizes)