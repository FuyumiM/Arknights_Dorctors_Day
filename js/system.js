
main();

function main() {
    main_page();

    test_event.forEach (event => {
        var s=new simple_event(event);
        addElement(s.getEvent());
    });
}

function main_page() {
    addElement(newElement(const_element_json["main_loading"]));

    addElement(newElement(const_element_json["main_link"]));

    var character_index = parseInt(Math.seededRandom(0, character_json.length - 1));
    var e_img=const_element_json["main_character_img"].replace("#CHARACTER_IMG_URL#",load_url + "png/" + character_json[character_index]['half']);
    addElement(newElement(e_img));

    var e_character_name=const_element_json["main_character_name"].replace("#CHARACTER_NAME#",character_json[character_index]['cn_name']).replace("#CHARACTER_EN_NAME#",character_json[character_index]['en_name']);
    addElement(newElement(e_character_name));

    var e_character_des=const_element_json["main_character_des"].replace("#CHARACTER_DES#",character_json[character_index]['des']).replace("#CHARACTER_MORE_DES#",character_json[character_index]['moredes']);
    addElement(newElement(e_character_des));

    addElement(newElement(const_element_json["main_link_success"]));

    var e_welcome=const_element_json["main_welcome"].replace("#NAME#",name);
    addElement(newElement(e_welcome));

    var e_level=const_element_json["main_level"].replace("#LEVEL#",get_Level(exp));
    addElement(newElement(e_level));

    var e_time=const_element_json["main_time"].replace("#TIME#",get_TimeLog());
    addElement(newElement(e_time));

    addElement(newElement(const_element_json["main_event"]));
}

function get_Level(exp) {
    var r = '博士后';
    if (this.exp < 1000) {
        r = '注册博士';
    } else if (exp < 3000) {
        r = '见习博士';
    } else if (exp < 7500) {
        r = '实习博士';
    } else if (exp < 25000) {
        r = '准博士';
    }else if (exp < 70000) {
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