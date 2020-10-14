# encoder
import binascii

def textToBinary(x):
	for c in x:
		ascii_num = ord(c)
		print(bin(ascii_num)
