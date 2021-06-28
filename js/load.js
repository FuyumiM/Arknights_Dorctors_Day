var debug = true;

if (debug) {
    var load_url = './';
} else {
    var load_url = 'https://cdn.jsdelivr.net/gh/FuyumiM/Arknights_Dorctors_Day@latest/';
}

addCSS('css/segmenting_line.css');

addJS('js/ui.js');
addJS('js/system.js');

function addJS(url) {
    var secScript = document.createElement('script');
    secScript.setAttribute('type', 'text/javascript');
    secScript.setAttribute('src', load_url + url);
    document.head.insertBefore(secScript, document.head.lastChild);
}

function addCSS(url) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", url);
    document.head.insertBefore(fileref, document.head.lastChild);
}