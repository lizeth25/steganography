from bs4 import BeautifulSoup

import requests
import urllib.request
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

url = 'https://www.cs.middlebury.edu/~schar/dept/majors/'
response = requests.get(url, verify=False)
soup = BeautifulSoup(response.content, "html.parser")

# find images in go/csmajors website and save in appropriate folder
images = soup.find_all("img")

for image in images:
    name = image['src']
    try:
        urllib.request.urlretrieve(url+name, name)
    except:
        print(name+" not found")
