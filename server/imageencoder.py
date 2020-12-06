from hello import *

i = sys.argv[1]
m = sys.argv[2] # message to use

aL = convertToList(i)
newArr, string_privatekey = to_encode(m, aL)

dict = { "arr": newArr, "privateKey": str(string_privatekey) }
y = json.dumps(dict)
print(y)