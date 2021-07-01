var debug = false;

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

Math.seededRandom = function (min, max) {
    max = max || 1;
    min = min || 0;
    Math.seed = (Math.seed * 9301 + 49297) % 233280;

    var rnd = Math.seed / 233280.0;

    return min + rnd * (max - min);
};

if (debug) {
    var load_url = './';
    var user_name = 'Fuyumi';
    var exp = 100000;
} else {
    var load_url = 'https://cdn.jsdelivr.net/gh/FuyumiM/Arknights_Dorctors_Day@latest/';
    var user_name = jinsom.nickname_base;
    var exp = jinsom.exp;
}

var name_seed = user_name.hashCode();
var day = new Date();
var time_seed = (day.getDate() + day.getMonth() * 31 + day.getFullYear() * 365) * 24 + day.getHours();
Math.seed = name_seed + time_seed * 9301 + 49297;

console.log(Math.seed.toString())

character_json = addJSON("json/character.json");
const_element_json = addJSON("json/const_element.json");
event_json = addJSON("json/event.json");

addCSS('css/segmenting_line.css');
addCSS('css/table.css');
addCSS('css/button.css');
addCSS('css/letter.css');

addJS('js/ui.js');
addJS('js/event.js');
addJS('js/game.js');

function addJS(url) {
    var secScript = document.createElement('script');
    secScript.setAttribute('type', 'text/javascript');
    secScript.setAttribute('src', load_url + url + "?ran=" + Math.random());
    secScript.async = false;
    document.head.insertBefore(secScript, document.head.lastChild);
}

function addCSS(url) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", load_url + url + "?ran=" + Math.random());
    fileref.async = false;
    document.head.insertBefore(fileref, document.head.lastChild);
}

function addJSON(url) {
    var r = "";
    if (debug) {
        r = $.ajax({ type: "get", url: "https://raw.githubusercontent.com/FuyumiM/Arknights_Dorctors_Day/main/" + url, async: false, cache: false, dataType: "json" }).responseJSON;
    } else {
        r = $.ajax({ type: "get", url: load_url + url, async: false, cache: false, dataType: "json" }).responseJSON;
    }
    return r;
}