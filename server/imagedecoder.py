from hello import *

e = sys.argv[1]
k = sys.argv[2] # p key to use

decrypted3 = to_decrypt(k, e)

dict = { "decodedMessage": decrypted3 }
y = json.dumps(dict)
print(y)
