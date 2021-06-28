String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

Math.seededRandom = function (max, min) {
    max = max || 1;
    min = min || 0;
    Math.seed = (Math.seed * 9301 + 49297) % 233280;

    var rnd = Math.seed / 233280.0;

    return min + rnd * (max - min);
};

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

function getBody() {
    var box = document.getElementsByClassName('jinsom-bbs-single-content');
    if (box.length == 0) {
        box = document.getElementsByClassName('jinsom-post-single-content');
    }
    if (box.length != 0) {
        return box[0];
    }
    return null;
}

function removeAllChild(div) {
    while (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
    }
}

function newLine(text) {
    var span = document.createElement('p');
    span.textContent = text;
    return span;
}
function newSpan(text) {
    var span = document.createElement('span');
    span.textContent = text;
    return span;
}

//用户代码

function hasStateKey(key) {
    return state[key] != null;
}

function hasState(key, s) {
    if (hasState[key] && state[key].indexOf(s) != -1) {
        return true;
    }
    return false;
}

function addState(key, s) {
    if (!hasStateKey(key)) {
        state[key] = [];
    }
    state[key].push(s);
}

//状态总结
class State_Print{
    constructor() {

    }

    toString() {
        return '';
    }
    toElement() {
        var e = document.createElement('p');

        e.appendChild(newLine('现在是'+state['时间'][0]));
        e.appendChild(newLine('您在'+state['地点'][0]));
        e.appendChild(newLine('您是'+state['权限'][0]));
        
        var l=newLine('');
        l.appendChild(newSpan('您现在的状态：'));
        state['全局'].forEach(element => {
            var s=newSpan(element);
            s.style.fontWeight = 'bold';
            l.appendChild(s);
            l.appendChild(newSpan(' '));
        });
        e.appendChild(l);

        var l=newLine('');
        l.appendChild(newSpan('您拥有的物品：'));
        state['物品'].forEach(element => {
            var s=newSpan(element);
            s.style.fontWeight = 'bold';
            l.appendChild(s);
            l.appendChild(newSpan(' '));
        });
        e.appendChild(l);

        e.appendChild(newLine(''));
        return e;
    }
}

//问候语
class Hello_World {
    constructor(name) {
        this.name = name;
    }

    toString() {
        return 'name:' + this.name;
    }

    toElement() {
        var e = document.createElement('p');
        e.appendChild(newLine('————————————————————神经连接中————————————————————'));
        e.appendChild(newLine('欢迎回来，Dr.' + this.name));
        var h = day.getHours();
        if (0 <= h && h < 6) {
            e.appendChild(newLine('现在是' + dateFormat("YYYY-mm-dd HH:MM", day) + '，夜深了，注意休息！'));
            addState('时间', '凌晨');
        } else if (6 <= h && h < 9) {
            e.appendChild(newLine('现在是' + dateFormat("YYYY-mm-dd HH:MM", day) + '，早上好，睡得好吗？'));
            addState('时间', '早上');
        } else if (9 <= h && h < 11) {
            e.appendChild(newLine('现在是' + dateFormat("YYYY-mm-dd HH:MM", day) + '，上午好，工作加油哦！'));
            addState('时间', '上午');
        } else if (11 <= h && h < 13) {
            e.appendChild(newLine('现在是' + dateFormat("YYYY-mm-dd HH:MM", day) + '，中午好，工作辛苦了。'));
            addState('时间', '中午');
        } else if (13 <= h && h < 18) {
            e.appendChild(newLine('现在是' + dateFormat("YYYY-mm-dd HH:MM", day) + '，下午好，工作加油哦！'));
            addState('时间', '下午');
        } else if (18 <= h && h < 24) {
            e.appendChild(newLine('现在是' + dateFormat("YYYY-mm-dd HH:MM", day) + '，晚上好，累了一天，早点休息哦！'));
            addState('时间', '晚上');
        }
        e.appendChild(newLine('来自：PRTS'));
        e.appendChild(newLine(''));
        return e;
    }
}

//权限检测
class Lv_Check {
    constructor(exp) {
        this.exp = exp;
    }

    toString() {
        return 'exp:' + this.exp;
    }
    toElement() {
        var e = document.createElement('p');
        e.appendChild(newLine('正在检测您的权限……'));
        var l = newLine('');
        l.appendChild(newSpan('您的权限为'));
        if (this.exp < 1000) {
            var lv = newSpan('见习博士');
            lv.style.fontWeight = 'bold';
            l.appendChild(lv);
            e.appendChild(l);
            addState('权限', '见习博士');
        } else if (this.exp < 3000) {
            var lv = newSpan('实习博士');
            lv.style.fontWeight = 'bold';
            l.appendChild(lv);
            e.appendChild(l);
            addState('权限', '实习博士');
        } else if (this.exp < 7500) {
            var lv = newSpan('准博士');
            lv.style.fontWeight = 'bold';
            l.appendChild(lv);
            e.appendChild(l);
            addState('权限', '准博士');
        } else if (this.exp < 25000) {
            var lv = newSpan('博士');
            lv.style.fontWeight = 'bold';
            l.appendChild(lv);
            e.appendChild(l);
            addState('权限', '博士');
        } else if (this.exp < 70000) {
            var lv = newSpan('博士后');
            lv.style.fontWeight = 'bold';
            l.appendChild(lv);
            e.appendChild(l);
            addState('权限', '博士后');
        }
        e.appendChild(newLine(''));
        return e;
    }
}

//运势测试
class Lucky_Check {
    constructor(seed) {
        this.seed=seed;
    }

    toString() {
        return 'seed:' + this.seed;
    }

    toElement() {
        var e = document.createElement('p');
        e.appendChild(newLine('正在为您进行占卜……'));
        Math.seed=this.seed;
        var lucky=parseInt(Math.seededRandom(0,lucky_json.length));
        e.appendChild(newLine('您这一小时的运势：'+lucky_json[lucky].text));
        lucky_json[lucky].state.forEach(element => {
            addState(element.key,element.state);
        });
        e.appendChild(newLine(''));
        return e;
    }
}

//地点选择
class Map_Select{
    constructor() {

    }

    toString() {

    }
    toElement() {
        var e = document.createElement('p');
        e.appendChild(newLine('正在前往目的地……'));
        var map=parseInt(Math.seededRandom(0,map_json.length));
        e.appendChild(newLine('您当前的位置：'+map_json[map].text));
        map_json[map].state.forEach(element => {
            addState(element.key,element.state);
        });
        e.appendChild(newLine(''));
        return e;
    }
}

function main() {
    var body = getBody();
    removeAllChild(body);
    body.appendChild(new Hello_World(jinsom.nickname_base).toElement());
    body.appendChild(new Lv_Check(jinsom.exp).toElement());
    body.appendChild(new Lucky_Check(name_seed * time_seed + 1).toElement());
    body.appendChild(new Map_Select().toElement());
    body.appendChild(new State_Print().toElement());
}

//博士状态
var state = {};

var name_seed = jinsom.nickname_base.hashCode();
var day = new Date();
var time_seed = (day.getDate() + day.getMonth() * 31 + day.getFullYear() * 365)*24+day.getHours();
Math.seed = name_seed * time_seed + 1;
var load_url='https://cdn.jsdelivr.net/gh/FuyumiM/Arknights_Dorctors_Day@latest/';
//var load_url = 'https://raw.githubusercontent.com/FuyumiM/Arknights_Dorctors_Day/main/';

lucky_json=$.ajax({type: "get",url: load_url+"lucky.json",async:false,dataType:"json"}).responseJSON;
map_json=$.ajax({type: "get",url: load_url+"map.json",async:false,dataType:"json"}).responseJSON;

main();