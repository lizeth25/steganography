
import json

public_key = rsa.encrypt()


d = { "text": "server hello", "author" : "jonas"}
y = json.dumps(d)

print(y)

# import sys

# if __name__ == "__main__":
#     st = sys.argv[1]

#     print(st + "from py")