var arr = new Array();

function initArr(table) {
    var tr = table.children[0].children;
    for (var i = 1; i < tr.length; i++) {
        var tds = tr[i].children;
        arr[i-1] = new Array();
        for (var j = 0; j < tds.length; j++) {
            if(j!=0){
                arr[i-1][j] = parseInt(tds[j].innerHTML);
            } else {
                arr[i-1][j] = tds[j].innerHTML;
            }
        }
    }
};

function getIndex(node, pnode) {
    var ch = pnode.children;
    for (var i = 0; i < ch.length; i++) {
        if (node == ch[i]) {
            return i;
        }
    }
};

function sortTable(index) {
    var cmp = cmp || function(x, y){return x>y;};
    for (var i = 0; i < arr.length; i++) {
        for(var j = i; j < arr.length; j++) {
            if (cmp(arr[i][index], arr[j][index])) {
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
};

window.onload = function() {
    var table = document.getElementsByTagName("table")[0];
    var tr = document.getElementsByTagName("tr");
    var thead = tr[0];

    initArr(table);

    thead.onclick = function(e) {
        if (e.target && e.target.nodeName.toUpperCase()=="TD"&&getIndex(e.target, e.target.parentNode)!=0) {
            sortTable(getIndex(e.target, e.target.parentNode));

            for (var i = 1; i < tr.length; i++) {
                var td = tr[i].children;
                for (var j = 0; j < td.length; j++) {
                    td[j].innerHTML = arr[i-1][j];
                }
            }
        }
    };
};
