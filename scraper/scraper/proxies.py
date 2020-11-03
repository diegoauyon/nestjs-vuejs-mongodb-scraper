from lxml.html import fromstring
import requests
from itertools import cycle


def get_proxies():
    url = 'https://free-proxy-list.net/'
    response = requests.get(url)
    parser = fromstring(response.text)
    proxies_list = []
    for i in parser.xpath('//tbody/tr'):
        if i.xpath('.//td[7][contains(text(),"yes")]'):
            proxy: str = ":".join([i.xpath('.//td[1]/text()')[0], i.xpath('.//td[2]/text()')[0]])
            proxies_list.append(proxy)
    return proxies_list


proxies = get_proxies()
proxy_pool = cycle(proxies)
proxies_num: int = len(proxies)
print('Available no. of proxies: {}'.format(proxies_num))

url = 'https://httpbin.org/ip'
good_proxies = []
for i in proxies:
    # Get a proxy from the pool
    proxy = next(proxy_pool)
    print("Testing proxy {}".format(proxy))
    try:
        response = requests.get(url, timeout=3, proxies={"http": proxy, "https": proxy})
        print(response.json())
        good_proxies.append(proxy)
    except:
        # Most free proxies will often get connection errors. You will have retry the entire request using another
        # proxy to work. We will just skip retries as its beyond the scope of this tutorial and we are only downloading
        # a single url
        print("Skipping. Connnection error")

if len(good_proxies) > 0:
    with open('proxies.txt', 'a') as file_object:
        for item in good_proxies:
            file_object.write('https://' + item)
            file_object.write("\n")
