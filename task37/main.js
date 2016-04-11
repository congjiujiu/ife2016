(function(){
    function getStyle(obj, style) {
        if (window.getComputedStyle) {
            //标准浏览器
            return getComputedStyle(obj, null)[style];
        } else {
            //针对IE8及IE8以下版本的浏览器
            return obj.currentStyle[style];
        }
    };

    function initFloatDiv(div, width, height, innerDiv, iwidth, iheight) {
        div.style.width = width+"px";
        div.style.height = height+"px";
        div.style.position = "fixed";
        div.style.top = "0px";
        div.style.left = "0px";
        div.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        div.style.display = "none";
        innerDiv.style.top = (height - iheight)/2 + "px";
        innerDiv.style.left = (width - iwidth)/2 + "px";
    };

    function closeFloatDiv() {
        var div = document.getElementsByClassName("floatLevel")[0];
        div.style.display = "none";
    }

    function openFloatDiv() {
        var div = document.getElementsByClassName("floatLevel")[0];
        div.style.display = "block";
    }

    document.body.onload = function() {
        var windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;

        var floatDiv = document.getElementsByClassName("floatLevel")[0];
        var alertWindow = document.querySelector(".floatLevel > div");
        var openButton = document.getElementById("openLevel");
        var closeButton = document.getElementById("windowCancel");
        var windowTitle = document.getElementById("windowTitle");

        var alertWidth = parseInt(getStyle(alertWindow, "width")),
            alertHeight = parseInt(getStyle(alertWindow, "height"));

        var dx = dy = 0;

        initFloatDiv(floatDiv, windowWidth, windowHeight, alertWindow, alertWidth, alertHeight);

        openButton.onclick = function() {
            openFloatDiv();
        };

        closeButton.onclick = function() {
            closeFloatDiv();
        };

        floatDiv.onclick = function(e) {
            if (e.target && e.target.className == "floatLevel") {
                closeFloatDiv();
            }
        };

        alertWindow.onmousedown = function(e) {
            var e = e || window.event,
                x = e.offsetX,
                y = e.offsetY;

            dx = x - parseInt(getStyle(alertWindow, 'left')),
            dy = y - parseInt(getStyle(alertWindow, 'top'));

            document.onmousemove = function(e) {
                var e = e || window.event,
                    x = e.offsetX,
                    y = e.offsetY;

                alertWindow.style.top = y - dy + "px";
                alertWindow.style.left = x - dx + "px";
                console.log(x+"   "+y+"\n"+dx+"   "+dy);
            };

            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    };
})();