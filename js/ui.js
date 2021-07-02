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
        var box = document.querySelector("body > div.jinsom-main-content.single-bbs.default.single.clear > div > div.jinsom-bbs-single-box.main.clear > div.right > div.jinsom-bbs-single-content");
        if (box == null) {
            box = document.querySelector("#jinsom-view-sns-0 > div.pages.navbar-through > div.page.no-tabbar.post-bbs.page-on-center > div.page-content.keep-toolbar-on-scroll.jinsom-page-single-content.jinsom-page-single-content-1306 > div.jinsom-single.jinsom-post-1306 > div.jinsom-post-single-content");
        }
        if (box != null) {
            return box;
        }
    }
    return null;
}

function removeAllChild(e) {
    while (e.hasChildNodes()) {
        e.removeChild(e.firstChild);
    }
}