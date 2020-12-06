import cv2
import os

vidcap = cv2.VideoCapture("testvideo.MOV")

images = []

#count = 0
while True:
    success, image = vidcap.read()
    if not success:
        break
    images.append(image)
    #cv2.imwrite(os.path.join("./temp", "{:d}.png".format(count)), image)
    #count += 1


# brew install ffmpeg

from subprocess import call, STDOUT

# audio

#call(["ffmpeg", "-i", "testvideo.MOV", "audio.mp3"], stdout = open(os.devnull, "w"), stderr = STDOUT)

############

def textToBinary(x):
    result = ''
    for c in x:
        ascii_num = ord(c)
        result = result + (format(ascii_num, '08b'))
    return result

def encode(image, message):
    msg_begin = str(len(message)) + '*' + message
    msg = textToBinary(msg_begin)
    msgLen = len(msg)
    img_copy = image
    i = 0

    for mat in img_copy:
        for pixel in mat:
            for rgb_val in range(0,3):
                if i < msgLen:
                    binNum = f'{pixel[rgb_val]:08b}'
                    newBin = binNum[:-1] + msg[i]
                    pixel[rgb_val] = int(newBin, 2)
                    i+=1
                else:
                    break
    return img_copy

def videoencode(video, message):
    msg_begin = str(len(message)) + '*' + message
    msg = textToBinary(msg_begin)

    #msg = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

    msgLen = len(msg)

    count = 206

    msgcopy = msg

    msgcount = 0

    if count >= msgLen:
        for filename in os.listdir("./temp"):
            img = cv2.imread(os.path.join("./temp", filename))
            if msgcount < msgLen:
                newimg = encode(img, msgcopy[msgcount])
                cv2.imwrite(os.path.join("./temp2", "{:d}.png".format(msgcount)), newimg)
            else:
                cv2.imwrite(os.path.join("./temp2", "{:d}.png".format(msgcount)), img)
            msgcount += 1
    else:
        namecount = 0
        parts = (msgLen // count) + 1
        if (msgLen / parts) < count:
            for filename in os.listdir("./temp"):
                img = cv2.imread(os.path.join("./temp", filename))
                if msgcount < msgLen:
                    newimg = encode(img, msgcopy[msgcount: msgcount + parts])
                    cv2.imwrite(os.path.join("./temp3", "{:d}.png".format(namecount)), newimg)
                else:
                    cv2.imwrite(os.path.join("./temp3", "{:d}.png".format(namecount)), img)
                msgcount += parts
                namecount += 1



def videoencode2(video, message):
    msg_begin = str(len(message)) + '*' + message
    msg = textToBinary(msg_begin)

    #msg = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

    msgLen = len(msg)

    count = 206

    msgcopy = msg

    msgcount = 0

    newimages = []
    if count >= msgLen:
        for image in images:
            if msgcount < msgLen:
                newimg = encode(image, msgcopy[msgcount])
                newimages.append(newimg)
            else:
                newimages.append(image)
            msgcount += 1
    else:
        namecount = 0
        parts = (msgLen // count) + 1
        if (msgLen / parts) < count:
            for image in images:
                if msgcount < msgLen:
                    newimg = encode(image, msgcopy[msgcount: msgcount + parts])
                    newimages.append(newimg)
                else:
                    newimages.append(image)
                msgcount += parts
                namecount += 1

     

videoencode2("video", "Lizeth")



# stitch frames together

#call(["ffmpeg", "-i", "./temp3/%d.png" , "-vcodec", "libx264", "-pix_fmt", "yuv420p", "newvideo.MOV", "-y"], stdout = open(os.devnull, "w"), stderr = STDOUT)

# add audio

#call(["ffmpeg", "-i", "newvideo.MOV", "-i", "audio.mp3", "-codec", "copy", "data/enc-", "newvideo2.mov", "-y"], stdout = open(os.devnull, "w"), stderr = STDOUT)
