from hello import *

i = sys.argv[1]
k = sys.argv[2] # key to use

aL = convertToList(i)
decodedMsg = to_decode(aL, k)

dict = { "decodedMessage": decodedMsg }
y = json.dumps(dict)
print(y)