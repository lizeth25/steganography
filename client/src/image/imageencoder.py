# encoder

import cv2

img = cv2.imread('nakagawa.jpg')

cv2.imshow('image', img)
cv2.waitKey(0)

def lsb(image, message):
    for row in image:
        for pixel in row:
            
