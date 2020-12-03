# need to install pycrypto module
# using pip install pycrypto
# https://pypi.org/project/pycrypto/
# https://www.dlitz.net/software/pycrypto/api/current/

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
    print("Public key pair:  ")
    print(f"(n = {bin(publickey.n)}, e = {bin(publickey.e)})")

    print("Private key pair:  ")
    print(f"(n = {bin(privatekey.n)}, e = {bin(privatekey.e)})")

    msg = "Yay"

    encodedmsg = msg.encode()

    print("Message to encrypt: ")
    print(msg)
    encrypted = encrypt(publickey, encodedmsg)


    print("Encrypted: ")
    encrypted2 = str(encrypted).strip('b')
    encrypted3 = str(encrypted2).strip("'")
    print(encrypted3)


    decrypted = str(decrypt(privatekey, encrypted))
    print("Decrypted: ")
    decrypted2 = decrypted.strip('b')
    decrypted3 = decrypted2.strip("'")
    print(decrypted3)

main()
