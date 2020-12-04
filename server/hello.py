
import json
from imageencoder import to_encode,to_decode

# public_key = rsa.encrypt()


# d = { "pixels": "server hello", "author" : "jonas"}
# y = json.dumps(d)

# print(y)

import sys

aS = sys.argv[1]
aSL = list(aS.split(","))
aL = list(map(int, aSL)) 

k = sys.argv[2]
# a = []
# for i in range(1545):
#     a.append(255)

dict = { "arr": aL, "privateKey": k }
y = json.dumps(dict)

print(y)

# if __name__ == "__main__":
#     st = sys.argv[1]

#     d = { "pixels": st, "msg" : "jonas"}
#     y = json.dumps(d)

#     print(y)

# dict = { "arr": [1,2,3], "privateKey": m }
# y = json.dumps(dict)

# 1546 error opt 2 193 characters
#1525 error opt 1 190 chars