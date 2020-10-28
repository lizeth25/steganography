import Crypto
from Crypto.PublicKey import RSA
from Crypto import Random
import base64

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
    message = b'hello world'
    encrypted = encrypt(publickey, message)
    #print(encrypted)

    decrypted = decrypt(privatekey, encrypted)
    #print(decrypted)

    msg = str(decrypted)
    print(msg.strip('b'))

main()
