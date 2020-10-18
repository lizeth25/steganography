# encoder

import cv2

img = cv2.imread('nakagawa.jpg')

cv2.imshow('image', img)
cv2.waitKey(0)


def textToBinary(x):
    result = ''
    for c in x:
        ascii_num = ord(c)
        result = result + (format(ascii_num, 'b'))
    return result

# print(str(textToBinary("hH")))

def lsb(image, message):
    for row in image:
        for pixel in row:
            
