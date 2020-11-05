# encoder

import cv2

# img = cv2.imread('nakagawa.jpg')

# cv2.imshow('image', img)
# cv2.waitKey(0)

def textToBinary(x):
    result = ''
    for c in x:
        ascii_num = ord(c)
        result = result + (format(ascii_num, '08b'))
    return result

def binaryToText(b):
    result = ''
    for i in range(0, len(b), 8):
        temp = b[i:i + 8]
        result = result + chr(int(temp, 2))
    return result
def encode(image, message):
    msg_begin = str(len(message)) + '*' + message
    msg = textToBinary(msg_begin)
    msgLen = len(msg)
    pixels_len = image.size // 3
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
    # cv2.imshow('new image', img_copy)
    return img_copy

def decode(image):
    # using * as signal to denote when the length of the message is done being encoded into message
    signal = "00101010" # represents the first *
    len_str = "" # bin string w/ length
    msg_len = "" # bin String converted
    hidden_msg = "" # encoded bin str
    foundLen = False
    foundMsg = False
    index = 0

    # we can use len_str to add 8 bin chars which we will convert to a number unless it is our signal
    # always check last 8 chars for signal. when found turn len_str[:-8] into integer
    # Then we keep and index and for every set of 8 bin numbers we have one character we add to our message

    # calculate length of the message by adding appropriate bin value to len_str until * tells us when to stop adding
    for mat in image:
        for pixel in mat:
            for rgb_val in range(0,3):
                    if not foundMsg:
                        binNum = f'{pixel[rgb_val]:08b}'
                        least_bit = binNum[-1]
                        if not foundLen:
                            if (len_str!="") and (len(len_str)%8 == 0):
                                last_eight = len_str[-8:]
                                # we can check last 8 bits added and convert to a character
                                if last_eight == signal:
                                    foundLen = True
                                    msg_len = int(msg_len) # length of out bit message
                                    hidden_msg += least_bit
                                # if not the signal, convert the eight bits to a character
                                else:
                                    msg_len += binaryToText(last_eight)
                                    len_str += least_bit # check this
                            else:
                                # we are adding the least significant value to our len_str until we find signal
                                len_str += least_bit

                        # length has been found we now are ready to add our binary numbers to our msg string and then convert
                        else:
                            if index<msg_len*8:
                                hidden_msg += least_bit
                                index += 1
                            else:
                                foundMsg = True
    
    # Our message now contains all the bits we need to convert
    out_msg = binaryToText(hidden_msg)
    print("Your decoded message is : \n" + out_msg)
    return(out_msg)