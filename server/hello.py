import cv2
import Crypto
from Crypto.PublicKey import RSA
from Crypto import Random
import base64
import json
import sys

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
def encodeIm(image, message):
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

def decodeIm(image):
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
    return (privatekey, publickey)

def encrypt(publickey, message):
    cipher_text = publickey.encrypt(message, 32)[0]
    b64cipher = base64.b64encode(cipher_text)
    return (b64cipher)

def decrypt(privatekey, b64cipher):
    decoded_ciphertext = base64.b64decode(b64cipher)
    message = privatekey.decrypt(decoded_ciphertext)
    return (message)

def to_encrypt(message):
    privatekey, publickey = makeRSAkeys()

    encodedmsg = message.encode()

    encrypted = encrypt(publickey, encodedmsg)

    encrypted2 = str(encrypted).strip('b')
    encrypted3 = str(encrypted2).strip("'")

    string_privatekey = privatekey.exportKey()
    return (encrypted3, string_privatekey)
 
# encrypted3, string_privatekey = to_encrypt("hi cs701")
encrypted3 = "hufzNo4SLG4/4+P2Q9vwx4QjGFO9oOByprZb9ER84uIBctC+7kqekGKwarDm3XpXwBdOtw+NMyZYS0oCPDLOvu/JnTVMO5vejtJxfvWnmYCHP4Ds10owRJrMJVxXMPPyJ+VeisdXKgEfca9004b+n3sHT4Rgir+hBtA9hJEIy+Y="
# print("    ")
string_privatekey = "b'-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQCy6N0i/VKKczS762g/6rHVwwAqkkvrnnar6oxJirq9mPr6hemZ\nfgaxf0Y3NzArb7dtBbV6BEe95e6OsHWy7xErokdfK4BPxT9irv2oF/EK6XK4WfD5\nqj/M4I4VzEeAtR0fUhq2cUwaEeiiB6MpwYhsE+6a2qI9fsQ7Q6qQpSrqtQIDAQAB\nAoGAOEK0L6mbyD/8SE/544epTsBYkAqbZ0fYp61FWmcO3Ep8OkXcNNGFx1FvwjNP\nqYkjFFykOe+Yo+Xng+WHzbISIrDXPePIK81R/e6uwpjrmr6gP3HtVXrGK9p0EBho\n52wa0Qy1PbUJ4/dt4zd73NugKdmLl5oZC8sn0rVSKPTWvCECQQDNCLxs7DOuRPev\nLAOCOZh91b1hqSt70Zit/64Z06WsIRdjvkTags5dFS221OTaeN6twAgn39xGLBuk\nDqu2evI5AkEA32G0qAUXPTozV2iWsFipIqXcbC2gsQmEi8uTTdLr4P7yu6oP5p0P\n0SycFeNrTfmI+wntUaAiY6pMWjkAT1hMXQJBAKKhTkwbYrbVL507jSDrLGCLfCcN\nt1cEHlXNmzwTG7MXoGTWU+j6nlNI7DS8UzZTb1VkH1P5hdAHRnlvxZX9mUkCQBx3\nty4yd+O1pxVcnteadPOVb6HZrsDhFaM7LmqclrL1yrlf0ubw3TMrHDkt4l7tjidv\n/G6KmddZvKFC4mc6OYECQHLc2eStzycklCMW46wEgG6hnbPW3CZCJnV/Tk+0oVGj\nfnxVIcbaodyUXbI9id90iB3j0HTLFBeUJqXRxfqEHbo=\n-----END RSA PRIVATE KEY-----'"


def to_decrypt(string_privatekey, encrypted):

    privatekey = RSA.importKey(string_privatekey)

    decrypted = str(decrypt(privatekey, encrypted))

    decrypted2 = decrypted.strip('b')
    decrypted3 = decrypted2.strip("'")

    return(decrypted3)

def to_encode(message, image):
    encrypted, string_privatekey = to_encrypt(message)
    img_copy = encodeIm(image, encrypted)
    return (img_copy, string_privatekey)

def to_decode(img_copy, string_privatekey):
    out_msg = decodeIm(img_copy)
    if(out_msg == "Not an encoded image"):
        return("Not an encoded image")
    decrypted3 = to_decrypt(string_privatekey, out_msg)
    return (decrypted3)



# public_key = rsa.encrypt()


# d = { "pixels": "server hello", "author" : "jonas"}
# y = json.dumps(d)

# print(y)

aS = sys.argv[1]
aSL = list(aS.split(","))
aL = list(map(int, aSL)) # array to use

k = sys.argv[2] # message to use
# a = []
# for i in range(1545):
#     a.append(255)

# nImage, pKey = to_encode(k, aL)
iE = encodeIm(aL, encrypted3)

dict = { "arr": iE, "privateKey": string_privatekey }
y = json.dumps(dict)

print(y)

# if __name__ == "__main__":
#     st = sys.argv[1]

#     d = { "pixels": st, "msg" : "jonas"}
#     y = json.dumps(d)

#     print(y)

# dict = { "arr": [1,2,3], "privateKey": m }
# y = json.dumps(dict)

# 1546 error opt 2 193 characters
#1525 error opt 1 190 chars