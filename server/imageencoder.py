from hello import *

# i = sys.argv[1]
m = sys.argv[1] # message to use

#aL = convertToList(i)
newArr = encodeIm(aL, m)

dict = { "arr": "k", "privateKey": str("j") }
y = json.dumps(dict)
print(y)
