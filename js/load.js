var debug = true;

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
    var name = 'Fuyumi';
    var exp = 100000;
} else {
    var load_url = 'https://cdn.jsdelivr.net/gh/FuyumiM/Arknights_Dorctors_Day@latest/';
    var name = jinsom.nickname_base;
    var exp = jinsom.exp;
}

var name_seed = name.hashCode();
var day = new Date();
var time_seed = (day.getDate() + day.getMonth() * 31 + day.getFullYear() * 365) * 24 + day.getHours();
Math.seed = name_seed * time_seed + 1;

character_json = addJSON("json/character.json");
const_element_json = addJSON("json/const_element.json");

addCSS('css/segmenting_line.css');

addJS('js/ui.js');
addJS('js/system.js');

function addJS(url) {
    var secScript = document.createElement('script');
    secScript.setAttribute('type', 'text/javascript');
    secScript.setAttribute('src', load_url + url);
    secScript.async = false;
    document.head.insertBefore(secScript, document.head.lastChild);
}

function addCSS(url) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", load_url + url);
    fileref.async = false;
    document.head.insertBefore(fileref, document.head.lastChild);
}

function addJSON(url) {
    var r = "";
    if (debug) {
        r = $.ajax({ type: "get", url: "https://raw.githubusercontent.com/FuyumiM/Arknights_Dorctors_Day/main/" + url, async: false, dataType: "json" }).responseJSON;
    } else {
        r = $.ajax({ type: "get", url: load_url + url, async: false, dataType: "json" }).responseJSON;
    }
    return r;
}