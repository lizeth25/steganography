import random

def gcd(x, y):
    if (y == 0):
        return x
    else:
        return gcd(y, x % y)

def isPrime(num):
    if num > 1:
        for i in range(2, num):
            if (num % i) == 0:
                return False
                break
        else:
            return True
    else:
        return False


def generateP():
    cond = True
    while cond == True:
         p = random.randrange(2 ** (1024-1), 2 ** (1024))
         if isPrime(p):
             cond = False
    return p

def generateQ(p):
    while True:
        q = random.randrange(2 ** (1024-1), 2 ** (1024))
        if (isPrime(q) and q != p and q < p):
            return q

def generateE(toitent):
    while True:
        e = random.randrange(2 ** (1024-1), 2 ** (1024))
        if (gcd(e, toitent) == 1):
            return e

def rsa():
    print("start")
    print(isPrime(117430373410538564863705444470946580760298521097179752643340100383334693238523904434020276299335707881565118033664674510161338651159795643466774091752898311941123364758558964795259562450949995244598521490592081827626650073211581353224632550908753790095408641843082372332779143648273790687961078892716105082474))
    #p = generateP()
    print("p: ")
    print(p)
    q = generateQ(p)
    print("q: ")
    print(q)

    n = p * q
    toitent = (p - 1) * (q - 1)
    print("toitent: ")
    print(toitent)

    e = generateE(toitent)
    d = inverse(e, toitent)

    c = encrypt(e, n, "d")
    decrypt(d, n, c)
    print("c: ")
    print(c)

def inverse(e, toitent):

    u1 = 1
    u2 = 0
    u3 = e
    v1 = 0
    v2 = 1
    v3 = toitent

    while v3 != 0:
        q = u3 // v3
        v1 = (u1 - q * v1)
        v2 = (u2 - q * v2)
        v3 = (u3 - q * v3)
        u1 = v1
        u2 = v2
        u3 = v3
    return u1 % toitent

def inverse2(e, toitent):
    d = 0
    x1 = 0
    x2 = 1
    y1 = 1
    temp_phi = toitent

    while e > 0:
        temp1 = temp_phi / e
        temp2 = temp_phi - temp1 * e
        temp_phi = e
        e = temp2

        x = x2 - temp1 * x1
        y = d - temp1 * y1

        x2 = x1
        x1 = x
        d = y1
        y1 = y

    if temp_phi == 1:
        return d + toitent

rsa()
