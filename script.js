var selection = 'home';

function update() {
    if (selection != null) {
        selectSection(selection, 'auto');
    }
}

function load_articles() {
    httpGetAsync('articles.json', (txt) => {
        var post = document.querySelector('.post');
        var container = document.querySelector('.projects .flexbox');
        var postContainer = document.querySelector('.post .container');
        articles = JSON.parse(txt);
        for(var i = 0 ; i < articles.length ; i++) {
            var article = articles[i];
            var box = document.createElement('div');
            var boxbar = document.createElement('div');
            var boximg = document.createElement('img');
            boxbar.classList.add('boxbar');
            box.classList.add('box');
            boximg.classList.add('boximg');

            boxbar.innerHTML = article.name;
            boximg.src = article.image;
            if ('post' in article) {
                boximg.setAttribute('article', article.post);
                boxbar.setAttribute('article', article.post);
                box.onclick = (event) => {
                    post.scrollTop = 0;
                    selectSection('post');
                    httpGetAsync(event.target.getAttribute('article'), (txt) => {
                        postContainer.innerHTML = txt;
                    });
                };
            } else if ('link' in article) {
                boximg.setAttribute('article', article.link);
                boxbar.setAttribute('article', article.link);
                box.onclick = (event) => {
                    window.location.href = event.target.getAttribute('article');
                };
            }

            box.appendChild(boxbar);
            box.appendChild(boximg);
            container.appendChild(box);
        }
    });
}

function goToContact() {
    var postContainer = document.querySelector('.post .container');
    selectSection('post');
    httpGetAsync('contact.html', (txt) => {
        postContainer.innerHTML = txt;
    });
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

window.onresize = update;
document.addEventListener('DOMContentLoaded', (event) => {
    load_articles();
    update();
});

function selectSection(section, bh='smooth') {
    selection = section;
    document.querySelector('.' + section).scrollIntoView({
        behavior: bh
    });
    var selected = document.querySelector('.selected');
    if (selected != null)
        selected.classList.remove('selected');
    var newSelection = document.querySelector('.' + section + '_b');
    if (newSelection != null)
        newSelection.classList.add('selected');
}