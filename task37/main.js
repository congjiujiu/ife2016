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

    // 初始化 浮出层 以及 窗口的样式
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

    // 关闭 浮出层
    function closeFloatDiv() {
        var div = document.getElementsByClassName("floatLevel")[0];
        div.style.display = "none";
    }

    // 打开 浮出层
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

        // 打开、关闭 浮出层 事件
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

        // 拖拽窗口 事件
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
            };

            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    };
})();
