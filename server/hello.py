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
    arr_copy = image
    i = 0

    for index in range(0,len(arr_copy)):
        if(index%4!=3):
            # check if i is less than msgLen
            if i < msgLen:
                binNum = f'{arr_copy[index]:08b}'
                newBin = binNum[:-1] + msg[i]
                arr_copy[index] = int(newBin, 2)
                i+=1
            else:
                break
    # cv2.imshow('new image', img_copy)
    return arr_copy

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
    for i in range(0, len(image)):
        if(i%4!=3):
            if not foundMsg:
                binNum = f'{image[i]:08b}'
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

    if not foundMsg:
        return("Msg Not Found")
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
    export_privatekey = privatekey.exportKey()
    pk = export_privatekey.decode()
    #pk2 = str(pk) # not necessary i think
    #arr = []
    #for i in pk:
    #    arr.append(i)
    return (encrypted3, pk)

def to_decrypt(string_privatekey, encrypted):
    #tryKey = string_privatekey.encode()

    privatekey = RSA.importKey(string_privatekey)
    decrypted = str(decrypt(privatekey, encrypted))
    decrypted2 = decrypted.strip('b')
    decrypted3 = decrypted2.strip("'")
    return(decrypted3)

#print("lets begin")
#encrypted3, pk2 = to_encrypt("hello")

#print(len(arr))
#print(len(pk2))
# pk2 normally 890 or 886

#something = ""
#for j in arr:
#    something += j
#print(something)



#yes = "hE/R+Ftwxv2UAt+ay+6BMyTK5kBxb2SL+c9sXKsWaRrQ0lQ1R3zpfkMOK6lMXajlEitFyJ0TO4lie1W9DyeX0gBbFaX0BnpUTTY6BA/tfuSfF5i5/WEq4f6yufFS9CXpMTVwZ1TPAAfj2kgJNb8kji1J/6dsYBAJuWz1NkPbUqI="

#decrypted3 = to_decrypt(pubkey2, yes)
#print(decrypted3)

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

def convertToList(a):
    outArr = []
    aS = a[:].replace("'", "").replace(" ", "")
    a = aS.split(',')
    for elem in a:
        outArr.append(int(elem))
    return(outArr)

# encrypted3 (172)
# (172*8+8+24 = how long array needs to be for image to be encoded)
# returning 496(img array) , private

# getKeys = return the keys private public
# {
#     k = thing encoding into image
#     image arr = (len([1348]))
# }



# getImage = give 1348 return array 1348 we should be fine


# 1546 error opt 2 193 characters
#1525 error opt 1 190 chars
# 1449 breaks there with max 110 message input length
# key size is 890
