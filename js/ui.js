var post_body = getBody();
removeAllChild(post_body);

function newElement(text) {
    var span = document.createElement('div');
    span.innerHTML = text;
    return span.childNodes[0];
}

function newIgnoreElement(text) {
    var span = document.createElement('div');
    span.innerHTML = text;
    var e=span.childNodes[0];
    e.id="Fuyumi_Capture_Ignore";
    return e;
}

function newText(text) {
    var span = document.createElement('p');
    span.innerHTML = text;
    span.style = 'text-indent: 2em;';
    return span;
}

function addElement(e) {
    post_body.appendChild(e);
}

function getBody() {
    if (debug) {
        var box = document.getElementsByName('debug_body');
        return box[0];
    } else {
        var box = document.getElementsByClassName("fuyumi_anchor")[0].parentElement;
        return box;
    }
}

function removeAllChild(e) {
    while (e.hasChildNodes()) {
        e.removeChild(e.firstChild);
    }
}