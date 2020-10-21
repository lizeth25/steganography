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
    msg = textToBinary(message)
    msg_len = len(msg)
    pixels_len = image.size // 3

    if pixels_len >= msg_len:
        for row in image:
            for col in range(0,3):
                print(image[row])
    else:
        print("Message exceeds size limit")

    
print(lsb(img, "Hi"))
