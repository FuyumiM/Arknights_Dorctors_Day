
main();

function main() {
    main_page();
    addElement(newElement("<br><br><br><br><p style='float:center;text-align: center;'>事件系统正在开发中，敬请期待</p>"));
}

function main_page() {
    addElement(newElement("<div class='segmenting-line'><hr><div><span>神经连接中</span></div></div>"));

    addElement(newElement("<p style='float:center;text-align: center;'>为您接通助理线路...</p>"));

    var character_index = parseInt(Math.seededRandom(0, character_json.length - 1));
    addElement(newElement("<p style='text-align: center;'><img align='center' src='" + load_url + "png/" + character_json[character_index]['half'] + "'></img></p>"));
    addElement(newElement("<p style='float:center;text-align: center;'>干员<span style='font-weight: bold;'>" + character_json[character_index]['cn_name']+" "+character_json[character_index]['en_name'] + "</span>正在担任您的助理</p>"));
    addElement(newElement("<p style='float:center;text-align: center;'>" + character_json[character_index]['des'] + "</p>"));
    addElement(newElement("<p style='float:center;text-align: center;'><i>" + character_json[character_index]['moredes'] + "</i></p>"));

    addElement(newElement("<div class='segmenting-line'><hr><div><span>连接成功</span></div></div>"));

    addElement(newElement("<p style='float:center;text-align: center;'>欢迎回来，<span style='font-weight: bold;'>Dr." + name + "</span></p>"));

    addElement(newElement("<p style='float:center;text-align: center;'>您正在以<span style='font-weight: bold;'>" + get_Level(exp) + "</span>身份登录终端</p>"));

    addElement(newElement("<p style='float:center;text-align: center;'>" + get_TimeLog() + "</p>"));
}

function get_Level(exp) {
    var r = '博士后';
    if (this.exp < 1000) {
        r = '见习博士';
    } else if (exp < 3000) {
        r = '实习博士';
    } else if (exp < 7500) {
        r = '准博士';
    } else if (exp < 25000) {
        r = '博士';
    }
    return r;
}

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

function get_TimeLog() {
    var r = '时间系统出错！';
    var h = day.getHours();
    if (0 <= h && h < 6) {
        r = '现在是' + dateFormat("YYYY-mm-dd HH:MM", day) + '，夜深了，注意休息！';
    } else if (6 <= h && h < 9) {
        r = '现在是' + dateFormat("YYYY-mm-dd HH:MM", day) + '，早上好，睡得好吗？';
    } else if (9 <= h && h < 11) {
        r = '现在是' + dateFormat("YYYY-mm-dd HH:MM", day) + '，上午好，工作加油哦！';
    } else if (11 <= h && h < 13) {
        r = '现在是' + dateFormat("YYYY-mm-dd HH:MM", day) + '，中午好，工作辛苦了。';
    } else if (13 <= h && h < 18) {
        r = '现在是' + dateFormat("YYYY-mm-dd HH:MM", day) + '，下午好，工作加油哦！';
    } else if (18 <= h && h < 24) {
        r = '现在是' + dateFormat("YYYY-mm-dd HH:MM", day) + '，晚上好，累了一天，早点休息哦！';
    }
    return r;
}