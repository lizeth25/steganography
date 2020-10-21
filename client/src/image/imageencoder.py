# encoder

import cv2

img = cv2.imread('nakagawa.jpg')

# cv2.imshow('image', img)
# cv2.waitKey(0)


def textToBinary(x):
    result = ''
    for c in x:
        ascii_num = ord(c)
        result = result + (format(ascii_num, 'b'))
    return result

def lsb(image, message):
    msg = textToBinary(message)
    print("msg is : "+ msg)

    msg_len = len(msg)
    pixels_len = image.size // 3
    img_copy = image
    i = 0
    for mat in img_copy:
        for pixel in mat:
            print("First pixel is : "+str(pixel))
            for rgb_val in range(0,3):
                if i < msg_len:
                    print("i is " , msg[i])
                    binNum = bin(pixel[rgb_val])
                    print("Previous RGB : " , pixel[rgb_val] , ", Pre RGB Bin: " , binNum)
                    newBin = binNum[2:-1] + msg[i]
                    pixel[rgb_val] = int(newBin, 2)
                    print("New RGB : " , pixel[rgb_val] , ", New RGB Bin: " , newBin)
                    i+=1
                else:
                    break
            print("New pixel is : " +str(pixel))

    
    if img_copy.all != img.all:
        print("Hooray!")
    else:
        print("cry")

    # print(image)
    
print(lsb(img, "Hi"))
