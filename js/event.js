
class simple_story{
    constructor(json) {
        this.next_flag="";
        this.story = json["story"];
        this.branch = json["branch"];
        if(json.hasOwnProperty("exp")){
            this.exp=new Function("element","story",json["exp"]);
        }else{
            this.exp=new Function("element","story","");
        }
    }
    getStory(){
        var e=newElement("<p></p>");
        this.story.forEach(text => {

            text=text.replace("#NAME#",name);

            e.appendChild(newText(text));
        });
        this.exp(e,this);
        e.appendChild(newElement("<br>"));
        return e;
    }
    getNext(random){
        var next="end";
        if(this.next_flag==""){
            var b=this.branch;
            for(var l=0;l<b.length;l++){
                if(b[l]["limit"]>=random){
                    next=b[l]["next"];
                    break;
                }
            }
        }else{
            next=this.next_flag;
        }
        console.log(next);
        return next;
    }
}

class simple_event {
    constructor(json) {
        this.event=json;
    }
    getAuthor(){
        return this.event["author"];
    }
    getName(){
        return this.event["name"];
    }
    getDes(){
        return this.event["des"];
    }
    getTime(){
        return this.event["time"];
    }
    getEvent(){
        if(!this.event.hasOwnProperty("head")){
            return newElement("<p>未发现事件起始</p>")
        }
        var e=newElement("<p></p>");
        var now="head";
        var deep=0;
        while(true){
            var p=new simple_story(this.event[now]);
            e.appendChild(p.getStory());
            var now=p.getNext(Math.seededRandom(1,100));
            if(now=="end"){
                return e;
            }
            deep++;
            if(deep>1000){
                return e;
            }
        }
    }
}

var test_event = [
    {
        "author": "Fuyumi",
        "name": "日常生活",
        "des": "博士平淡无奇且无聊的长草生活",
        "head": {
            "story": [
                "闹钟铃响，#NAME#伸了个懒腰，在床上坐了起来",
                "凯尔希今天要和几个医疗公司谈论合作的事情，暂时不在罗德岛本舰上，阿米娅也有任务，出了外勤",
                "“应该没有人催我去工作了吧……”",
                "#NAME#这样想着"
            ],
            "branch": [
                {
                    "limit": 10,
                    "next": "睡回笼觉"
                },
                {
                    "limit": 100,
                    "next": "检查工作计划"
                }
            ]
        },
        "睡回笼觉": {
            "story": [
                "“呵欠……”",
                "“没有人监督的生活真好啊”",
                "“睡了睡了”",
                "#NAME#重新躺了下来，再次进入了梦乡"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "end"
                }
            ]
        },
        "检查工作计划": {
            "story": [
                "“桌上这是……？”",
                "“工作计划书？还有一张字条？”",
                "#NAME#拿起了那张字条，上面是阿米娅的笔记",
                "“#NAME#，你还有#AMIYA_SCHEDULE_COUNT#件事情需要处理，现在还不能休息哦”",
                "#NAME#看了看身边那一叠任务书，仿佛看到了自己接下来一天的悲惨生活",
                "“还是开始工作吧……要是做不完，阿米娅估计会很生气的！”"
            ],
            "exp":"amiya_schedule_count=parseInt(Math.seededRandom(3,5));element.innerHTML=element.innerHTML.replace('#AMIYA_SCHEDULE_COUNT#',amiya_schedule_count.toString());",
            "branch": [
                {
                    "limit": 100,
                    "next": "开始工作"
                }
            ]
        },
        "开始工作": {
            "story": [
                "#NAME#检查了一下那一叠任务书",
                "“还剩下#AMIYA_SCHEDULE_COUNT#件工作吗？”",
                "“加油啊！#NAME#”"
            ],
            "exp":"if(amiya_schedule_count<=0){this.next_flag='工作完成'}element.innerHTML=element.innerHTML.replace('#AMIYA_SCHEDULE_COUNT#',parseInt(amiya_schedule_count).toString());amiya_schedule_count--;",
            "branch": [
                {
                    "limit": 10,
                    "next": "刷龙门币"
                },
                {
                    "limit": 20,
                    "next": "刷技能书"
                },
                {
                    "limit": 30,
                    "next": "刷碳"
                },
                {
                    "limit": 80,
                    "next": "刷经验"
                },
                {
                    "limit": 100,
                    "next": "刷红票"
                }
            ]
        },
        "工作完成": {
            "story": [
                "“终于做完了！收获丰厚啊！”",
                "“这下不用担心被阿米娅批评了！”",
                "“休息休息，睡了，绝不把疲劳留给第二天”"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "end"
                }
            ]
        },
        "刷龙门币": {
            "story": [
                "<div class='segmenting-line'><hr><div><span>货物运送开始</span></div></div>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷龙门币_作战资料_部署干员"
                }
            ]
        },
        "刷龙门币_作战资料_部署干员": {
            "story": [
                
            ],
            "exp":"var e_list=['“讯使，部署到上方治疗地块上！准备好之后立刻开始回复费用！”','“玫剑圣，部署到中间治疗地块上！准备单切术士！”','“调香师，下场，治疗他们！”','“猫猫头，后方支援，辅助清理杂兵！”','“红豆，准备清理源石虫！”','“安洁莉娜，反重力！”','“小羊！火山！”'];element.appendChild(newElement('<p style=\\'text-indent: 2em;\\'>'+e_list[parseInt(Math.seededRandom(0,e_list.length))]+'</p>'))",
            "branch": [
                {
                    "limit": 100,
                    "next": "刷龙门币_作战资料_战斗内容"
                }
            ]
        },
        "刷龙门币_作战资料_战斗内容": {
            "story": [
                
            ],
            "exp":"var e_list=['“大斧哥来了，全体警惕，全力应对！小心它的斧头！”','“左边源石虫，注意及时击杀！它要漏了！”','“后面的大盾哥来了，术士准备！技能开启！”','“法术近卫出现在红点！治疗干员准备！”'];element.appendChild(newElement('<p style=\\'text-indent: 2em;\\'>'+e_list[parseInt(Math.seededRandom(0,e_list.length))]+'</p>'))",
            "branch": [
                {
                    "limit": 10,
                    "next": "刷龙门币_作战资料_战斗结算1"
                },
                {
                    "limit": 100,
                    "next": "刷龙门币_作战资料_战斗结算2"
                }
            ]
        },
        "刷龙门币_作战资料_战斗结算1": {
            "story": [
                "<font color='#ff0000'>Mission Complete</font>",
                "行动结束：<font color='#dddd00'>★★☆</font>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷龙门币_结束"
                }
            ]
        },
        "刷龙门币_作战资料_战斗结算2": {
            "story": [
                "<font color='#ff0000'>Mission Complete</font>",
                "行动结束：<font color='#dddd00'>★★★</font>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷龙门币_结束"
                }
            ]
        },
        "刷龙门币_结束": {
            "story": [
                "<div class='segmenting-line'><hr><div><span>货物运送结束</span></div></div>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "开始工作"
                }
            ]
        },
        "刷技能书": {
            "story": [
                "<div class='segmenting-line'><hr><div><span>空中威胁开始</span></div></div>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷技能书_作战资料_部署干员"
                }
            ]
        },
        "刷技能书_作战资料_部署干员": {
            "story": [
                
            ],
            "exp":"var e_list=['“陨星，使用霰射弹头清理聚集的无人机！”','“华法琳，准备不稳定血浆，支援能天使！”','“飞机冲过来了，能天使，过载准备完成了吗？”','“猫猫头，伤害辅助，有几个残血的无人机过去了！”','“安洁莉娜！反重力，击杀那个术士！”'];element.appendChild(newElement('<p style=\\'text-indent: 2em;\\'>'+e_list[parseInt(Math.seededRandom(0,e_list.length))]+'</p>'))",
            "branch": [
                {
                    "limit": 100,
                    "next": "刷技能书_作战资料_战斗内容"
                }
            ]
        },
        "刷技能书_作战资料_战斗内容": {
            "story": [
                
            ],
            "exp":"var e_list=['“御4无人机出现，优先攻击目标！”','“一群妖怪无人机即将出现，注意及时清理！”','“检测到敌人飞行器，准备迎接空降队伍！”','“高阶术士组长进入观测范围，全员戒备！”'];element.appendChild(newElement('<p style=\\'text-indent: 2em;\\'>'+e_list[parseInt(Math.seededRandom(0,e_list.length))]+'</p>'))",
            "branch": [
                {
                    "limit": 10,
                    "next": "刷技能书_作战资料_战斗结算1"
                },
                {
                    "limit": 100,
                    "next": "刷技能书_作战资料_战斗结算2"
                }
            ]
        },
        "刷技能书_作战资料_战斗结算1": {
            "story": [
                "<font color='#ff0000'>Mission Complete</font>",
                "行动结束：<font color='#dddd00'>★★☆</font>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷技能书_结束"
                }
            ]
        },
        "刷技能书_作战资料_战斗结算2": {
            "story": [
                "<font color='#ff0000'>Mission Complete</font>",
                "行动结束：<font color='#dddd00'>★★★</font>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷技能书_结束"
                }
            ]
        },
        "刷技能书_结束": {
            "story": [
                "<div class='segmenting-line'><hr><div><span>空中威胁结束</span></div></div>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "开始工作"
                }
            ]
        },
        "刷红票": {
            "story": [
                "<div class='segmenting-line'><hr><div><span>粉碎防御开始</span></div></div>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷红票_作战资料_部署干员"
                }
            ]
        },
        "刷红票_作战资料_部署干员": {
            "story": [
                
            ],
            "exp":"var e_list=['“夜莺，帮助维持队友血线！”','“华法琳，准备不稳定血浆，支援能天使！”','“白面鸮，脑啡肽预备，术士要来了！”','“玫剑圣！准备单切炮击组长！”','“小羊，点燃，干掉那几个狙击手！”','“星熊，荆棘！保证自身不被击败！”'];element.appendChild(newText(e_list[parseInt(Math.seededRandom(0,e_list.length))]))",
            "branch": [
                {
                    "limit": 100,
                    "next": "刷红票_作战资料_战斗内容"
                }
            ]
        },
        "刷红票_作战资料_战斗内容": {
            "story": [
                
            ],
            "exp":"var e_list=['“高阶术士组长出现，优先攻击目标！”','“炮击组长即将出现，注意及时清理！”','“检测到萨卡兹大剑手，重装干员准备！”','“萨卡兹狙击手出现，高台干员注意规避！”'];element.appendChild(newText(e_list[parseInt(Math.seededRandom(0,e_list.length))]))",
            "branch": [
                {
                    "limit": 10,
                    "next": "刷红票_作战资料_战斗结算1"
                },
                {
                    "limit": 100,
                    "next": "刷红票_作战资料_战斗结算2"
                }
            ]
        },
        "刷红票_作战资料_战斗结算1": {
            "story": [
                "<font color='#ff0000'>Mission Complete</font>",
                "行动结束：<font color='#dddd00'>★★☆</font>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷红票_结束"
                }
            ]
        },
        "刷红票_作战资料_战斗结算2": {
            "story": [
                "<font color='#ff0000'>Mission Complete</font>",
                "行动结束：<font color='#dddd00'>★★★</font>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷红票_结束"
                }
            ]
        },
        "刷红票_结束": {
            "story": [
                "<div class='segmenting-line'><hr><div><span>粉碎防御结束</span></div></div>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "开始工作"
                }
            ]
        },
        "刷碳": {
            "story": [
                "<div class='segmenting-line'><hr><div><span>资源保障开始</span></div></div>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷碳_作战资料_部署干员"
                }
            ]
        },
        "刷碳_作战资料_部署干员": {
            "story": [
                
            ],
            "exp":"var e_list=['“阿消，跑到那个坑旁边！”','“暗锁，辅助队友，处理掉那些重量轻的单位！”','“塞雷亚，准备阻挡敌人，不要放走任何一个敌人！”','“小羊，点燃，干掉那几个法术近卫组长！！”'];element.appendChild(newElement('<p style=\\'text-indent: 2em;\\'>'+e_list[parseInt(Math.seededRandom(0,e_list.length))]+'</p>'))",
            "branch": [
                {
                    "limit": 100,
                    "next": "刷碳_作战资料_战斗内容"
                }
            ]
        },
        "刷碳_作战资料_战斗内容": {
            "story": [
                
            ],
            "exp":"var e_list=['“法术近卫组长出现，优先攻击目标！”','“重装防御组长即将出现，注意及时清理！”','“检测到武装人员，重装干员准备！”','“磐蟹出现，推拉干员准备进行清理！”'];element.appendChild(newElement('<p style=\\'text-indent: 2em;\\'>'+e_list[parseInt(Math.seededRandom(0,e_list.length))]+'</p>'))",
            "branch": [
                {
                    "limit": 10,
                    "next": "刷碳_作战资料_战斗结算1"
                },
                {
                    "limit": 100,
                    "next": "刷碳_作战资料_战斗结算2"
                }
            ]
        },
        "刷碳_作战资料_战斗结算1": {
            "story": [
                "<font color='#ff0000'>Mission Complete</font>",
                "行动结束：<font color='#dddd00'>★★☆</font>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷碳_结束"
                }
            ]
        },
        "刷碳_作战资料_战斗结算2": {
            "story": [
                "<font color='#ff0000'>Mission Complete</font>",
                "行动结束：<font color='#dddd00'>★★★</font>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷碳_结束"
                }
            ]
        },
        "刷碳_结束": {
            "story": [
                "<div class='segmenting-line'><hr><div><span>资源保障结束</span></div></div>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "开始工作"
                }
            ]
        },
        "刷经验": {
            "story": [
                "<div class='segmenting-line'><hr><div><span>战术演习开始</span></div></div>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷经验_作战资料_部署干员"
                }
            ]
        },
        "刷经验_作战资料_部署干员": {
            "story": [
                
            ],
            "exp":"var e_list=['“猫猫头，侧位支援，辅助清理杂兵！”','“红豆，准备清理源石虫！”','“能天使，无人机来了！”','“德克萨斯！剑雨！晕住他！”'];element.appendChild(newElement('<p style=\\'text-indent: 2em;\\'>'+e_list[parseInt(Math.seededRandom(0,e_list.length))]+'</p>'))",
            "branch": [
                {
                    "limit": 100,
                    "next": "刷经验_作战资料_战斗内容"
                }
            ]
        },
        "刷经验_作战资料_战斗内容": {
            "story": [
                
            ],
            "exp":"var e_list=['“源石虫大量出现，快速击杀！”','“猎狗大量出现，一定要挡住！！”','“检测到武装人员，重装干员准备！”','“重装防御者出现，术士干员准备！”'];element.appendChild(newElement('<p style=\\'text-indent: 2em;\\'>'+e_list[parseInt(Math.seededRandom(0,e_list.length))]+'</p>'))",
            "branch": [
                {
                    "limit": 10,
                    "next": "刷经验_作战资料_战斗结算1"
                },
                {
                    "limit": 100,
                    "next": "刷经验_作战资料_战斗结算2"
                }
            ]
        },
        "刷经验_作战资料_战斗结算1": {
            "story": [
                "<font color='#ff0000'>Mission Complete</font>",
                "行动结束：<font color='#dddd00'>★★☆</font>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷经验_结束"
                }
            ]
        },
        "刷经验_作战资料_战斗结算2": {
            "story": [
                "<font color='#ff0000'>Mission Complete</font>",
                "行动结束：<font color='#dddd00'>★★★</font>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "刷经验_结束"
                }
            ]
        },
        "刷经验_结束": {
            "story": [
                "<div class='segmenting-line'><hr><div><span>战术演习结束</span></div></div>"
            ],
            "branch": [
                {
                    "limit": 100,
                    "next": "开始工作"
                }
            ]
        }
    }
]