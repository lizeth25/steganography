from hello import *

e = sys.argv[1]
k = sys.argv[2] # p key to use

key = '-----BEGIN RSA PRIVATE KEY-----' + '\n' + k[:64] + '\n' + k[65:129] + '\n' + k[130:194] + '\n' + k[195:259] + '\n' + k[260:324] + '\n' + k[325:389] + '\n' + k[390:454] + '\n' + k[455:519] + '\n' + k[520:584] + '\n' + k[585:649] + '\n' + k[650:714] + '\n' + k[715:779] + '\n' + k[780:] + '\n' + '-----END RSA PRIVATE KEY-----'

decrypted3 = to_decrypt(key, e)

dict = { "decodedMessage": decrypted3}
y = json.dumps(dict)
print(y)
