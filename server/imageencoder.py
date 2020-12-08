from hello import *

m = sys.argv[1] # message to use

encrypted3, string_privatekey = to_encrypt(m)

dict = { "encrypted": str(encrypted3), "privateKey": str(string_privatekey)}
y = json.dumps(dict)
print(y)
