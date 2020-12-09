from hello import *

m = sys.argv[1] # message to use

encrypted3, string_privatekey = to_encrypt(m)
string_privatekey = string_privatekey[31:857]

dict = { "encrypted": str(encrypted3), "privateKey": string_privatekey}
y = json.dumps(dict)
print(y)
