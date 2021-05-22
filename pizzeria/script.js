window.addEventListener('DOMContentLoaded', (event) => {
    const table = document.querySelector('.menu');
    httpGetAsync('menu.txt', (txt) => {
        rows = txt.trim().split('\r\n');
        var first = true;
        rows.forEach(row => {
            cells = row.split('\t');
            var tr = document.createElement('tr');
            tr.innerHTML = '<tr>';
            
            for(var i = 0 ; i < 4 ; i++) {
                var cell = cells[i];
                if(first) {
                    tr.innerHTML += '<th>' + cell + '</th>';
                } else {
                    if (i == 0) {
                        tr.innerHTML += '<td>' + cell + '<br/><a class="ingredients">' + cells[4] + '</a></td>';
                    } else {
                        tr.innerHTML += '<td>' + cell + '</td>';
                    }
                }
            }
            first = false;
            tr.innerHTML += '</tr>'
            table.appendChild(tr);
        });
    });
});

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