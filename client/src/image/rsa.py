# need to install pycrypto module
# using pip install pycrypto
# https://pypi.org/project/pycrypto/
# https://www.dlitz.net/software/pycrypto/api/current/

import Crypto
from Crypto.PublicKey import RSA
from Crypto import Random
import base64
from pprint import pprint

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

def main():
    privatekey, publickey = makeRSAkeys()
    #print(vars(publickey))
    #print("///")
    #pprint(vars(publickey))
    #print(publickey.__dict__)
    #pprint.pprint(publickey.__dict__)

    print("Public Key pair: ")
    print(publickey)

    message = b'Yay'

    print("Message to encrypt: ")
    print("Yay")
    encrypted = encrypt(publickey, message)
    #print(encrypted)

    print("Encrypted: ")
    print(str(encrypted).strip('b'))
    decrypted = decrypt(privatekey, encrypted)
    #print(decrypted)

    msg = str(decrypted)
    #print(msg.strip('b'))

main()
