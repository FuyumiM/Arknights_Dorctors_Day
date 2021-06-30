# -*- coding: utf-8 -*-

import requests
import os
import json
import urllib.parse
import re
from bs4 import BeautifulSoup

def downloadImg(url, path):
    d = 'F:\\Project\\Arknights_Dorctors_Day\\png\\'
    path = d+url.split('/')[-1]
    try:
        if not os.path.exists(d):
            os.mkdir(d)
        if not os.path.exists(path):
            r = requests.get(url)
            r.raise_for_status()
            with open(path, 'wb') as f:
                f.write(r.content)
                f.close()
                print("图片保存成功")
        else:
            print("图片已存在")
    except:
        print("图片获取失败")


def get_voice(name):
    url = "http://prts.wiki/w/"+name+"/语音记录"
    headers = {
        "Cookie": "arccount62298=c; arccount62019=c",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66"
    }
    html = requests.get(url, headers=headers)
    html.encoding = html.apparent_encoding
    soup = BeautifulSoup(html.text, "html.parser")
    voice={}
    table_length=int((len(soup.select("#mw-content-text > div > table.wikitable.nomobile > tbody")[0].contents)+1)/2)
    for i in range(0,table_length):
        text=soup.select("#mw-content-text > div > table.wikitable.nomobile > tbody > tr:nth-child("+str(i+1)+") > td:nth-child(2) > p:nth-child(2)")[0].text
        text=re.sub("\(.*?\)", "", text)
        type=soup.select("#mw-content-text > div > table.wikitable.nomobile > tbody > tr:nth-child("+str(i+1)+") > th > b")[0].text
        voice[type]=text
    return voice

text = open('F:\Project\Arknights_Dorctors_Day\json\character_ori.json',
            'r', encoding='utf-8').read()

js = json.loads(text)
data = []

for value in js:
    new_value = {}
    new_value['cn_name'] = value['cn']
    new_value['voice']=get_voice(new_value['cn_name'])
    new_value['en_name'] = value['en']
    new_value['des'] = value['des']
    new_value['class'] = value['class']
    new_value['rarity'] = value['rarity']
    new_value['camp'] = value['camp']
    new_value['position'] = value['position']
    new_value['birthplace'] = value['birthplace']
    new_value['moredes'] = value['moredes']
    new_value['icon'] = urllib.parse.unquote(value['icon']).split('/')[-1]
    new_value['half'] = urllib.parse.unquote(value['half']).split('/')[-1]
    data.append(new_value)
    print(new_value['cn_name'])
    # downloadImg(new_value['icon'],'F:\Project\Arknights_Dorctors_Day\png')
    # downloadImg(new_value['half'],'F:\Project\Arknights_Dorctors_Day\png')

open('F:\Project\Arknights_Dorctors_Day\json\character.json', 'w',
     encoding='utf-8').write(json.dumps(data, ensure_ascii=False))
