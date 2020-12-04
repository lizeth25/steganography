# encoder

import cv2
import Crypto
from Crypto.PublicKey import RSA
from Crypto import Random
import base64

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
    # params
    # image : array
    # message : string
    msg_begin = str(len(message)) + '*' + message
    msg = textToBinary(msg_begin)
    msgLen = len(msg)
    img_copy = image
    i = 0

    for index in range(0,len(img_copy)):
        if index%4!=3:
            # check if i is less than msgLen
            if i < msgLen:
                binNum = f'{img_copy[index]:08b}'
                newBin = binNum[:-1] + msg[i]
                img_copy[index] = int(newBin, 2)
                i+=1
            else:
                break
    # cv2.imshow('new image', img_copy)
    return img_copy

content = [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5, 0, 0, 0, 5, 8, 6, 0, 0, 0, 141, 111, 38, 229, 0, 0, 0, 28, 73, 68, 65, 84, 8, 215, 99, 248, 255, 255, 63, 195, 127, 6, 32, 5, 195, 32, 18, 132, 208, 49, 241, 130, 88, 205, 4, 0, 14, 245, 53, 203, 209, 142, 14, 31, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 90]
newArr = encode(content, "hi")
print(newArr)
print(len(newArr))

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
    for index in range(0, len(image)):
        if index%4!=3:
            if not foundMsg:
                binNum = f'{image[index]:08b}'
                least_bit = binNum[-1]
                if not foundLen:
                    if (len_str!="") and (len(len_str)%8 == 0):
                        last_eight = len_str[-8:]
                        # we can check last 8 bits added and convert to a character
                        if last_eight == signal:
                            foundLen = True
                            try:
                                msg_len = int(msg_len) # length of out bit message
                            except:
                                return("Not an encoded image")
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
    # print("Your decoded message is : \n" + out_msg)

    # Two possible return statements : Not an encoded image or decoded message
    return(out_msg)

# need to install pycrypto module
# using pip install pycrypto
# https://pypi.org/project/pycrypto/
# https://www.dlitz.net/software/pycrypto/api/current/

def makeRSAkeys():
    length = 1024 #bits
    privatekey = RSA.generate(length, Random.new().read)
    publickey = privatekey.publickey()
    return privatekey, publickey

def encrypt(publickey, message):
    cipher_text = publickey.encrypt(message, 32)[0]
    b64cipher = base64.b64encode(cipher_text)
    return b64cipher

def decrypt(privatekey, b64cipher):
    decoded_ciphertext = base64.b64decode(b64cipher)
    message = privatekey.decrypt(decoded_ciphertext)
    return message

def to_encrypt(message):
    privatekey, publickey = makeRSAkeys()

    encodedmsg = message.encode()

    encrypted = encrypt(publickey, encodedmsg)

    encrypted2 = str(encrypted).strip('b')
    encrypted3 = str(encrypted2).strip("'")

    string_privatekey = privatekey.exportKey()
    return encrypted, string_privatekey
 
def to_decrypt(string_privatekey, encrypted):

    privatekey = RSA.importKey(string_privatekey)

    decrypted = str(decrypt(privatekey, encrypted))

    decrypted2 = decrypted.strip('b')
    decrypted3 = decrypted2.strip("'")

    return decrypted3

def to_encode(message, image):
    encrypted, string_privatekey = to_encrypt(message)
    img_copy = encode(image, encrypted)
    return img_copy, string_privatekey

def to_decode(img_copy, string_privatekey):
    out_msg = decode(img_copy)
    if(out_msg == "Not an encoded image"):
        return "Not an encoded image"
    decrypted3 = to_decrypt(string_privatekey, out_msg)
    return decrypted3
