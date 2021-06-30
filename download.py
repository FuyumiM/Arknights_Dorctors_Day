import requests
import os
import json
import urllib.parse

def downloadImg(url,path):
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


text=open('F:\Project\Arknights_Dorctors_Day\json\character_ori.json','r', encoding='utf-8').read()

js=json.loads(text)
data=[]

for value in js:
    new_value={}
    new_value['cn_name']=value['cn']
    new_value['en_name']=value['en']
    new_value['des']=value['des']
    new_value['class']=value['class']
    new_value['rarity']=value['rarity']
    new_value['camp']=value['camp']
    new_value['position']=value['position']
    new_value['birthplace']=value['birthplace']
    new_value['moredes']=value['moredes']
    new_value['icon']=urllib.parse.unquote(value['icon']).split('/')[-1]
    new_value['half']=urllib.parse.unquote(value['half']).split('/')[-1]
    data.append(new_value)
    #downloadImg(new_value['icon'],'F:\Project\Arknights_Dorctors_Day\png')
    #downloadImg(new_value['half'],'F:\Project\Arknights_Dorctors_Day\png')

open('F:\Project\Arknights_Dorctors_Day\json\character.json','w', encoding='utf-8').write(json.dumps(data,ensure_ascii=False))