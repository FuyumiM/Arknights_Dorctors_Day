var post_body = getBody();
removeAllChild(post_body);

function newElement(text) {
    var span = document.createElement('div');
    span.innerHTML = text;
    return span.childNodes[0];
}

function newText(text) {
    var span = document.createElement('p');
    span.innerHTML = text;
    span.style='text-indent: 2em;';
    return span;
}

function addElement(e){
    post_body.appendChild(e);
}

function getBody() {
    if(debug){
        var box = document.getElementsByName('debug_body');
        return box[0];
    }else{
        var box = document.getElementsByClassName('jinsom-bbs-single-content');
        if (box.length == 0) {
            box = document.getElementsByClassName('jinsom-post-single-content');
        }
        if (box.length != 0) {
            return box[0];
        }
    }
    return null;
}

function removeAllChild(e) {
    while (e.hasChildNodes()) {
        e.removeChild(e.firstChild);
    }
}