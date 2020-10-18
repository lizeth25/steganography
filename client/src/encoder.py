# encoder

def textToBinary(x):
	result = ''
	for c in x:
		ascii_num = ord(c)
		result = result + (format(ascii_num, 'b'))
	return result

# print(str(textToBinary("hH")))
