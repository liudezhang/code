/****
 * drag(拖拽)
 * 函数名称：drag
 * 函数功能：实现盒子拖拽功能
 */
function drag(node) {
    // 鼠标按下获取被拖拽物体的相对位置
    node.onmousedown = function (ev) {
        let e = ev || window.event;
        let offsetX = e.clientX - this.offsetLeft;
        let offsetY = e.clientY - this.offsetTop;
        // 鼠标移动被拖拽物体保持与鼠标保持相对距离
        document.onmousemove = function (ev) {
            let e = ev || window.event;
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;
            node.style.left = x + 'px';
            node.style.top = y + 'px';
        };
    };
    // 鼠标弹起取消拖拽
    document.onmouseup = function () {
        document.onmousemove = null;
    };
}

/****
 * limitation drag(限制拖拽出界)
 * 函数名称：limitDrag
 * 函数功能：实现盒子拖拽功能，但是不出界
 */
function limitDrag(node) {
    // 鼠标按下获取被拖拽物体的相对位置
    node.onmousedown = function (ev) {
        let e = ev || window.event;
        let offsetX = e.clientX - this.offsetLeft;
        let offsetY = e.clientY - this.offsetTop;
        // 鼠标移动被拖拽物体保持与鼠标保持相对距离
        document.onmousemove = function (ev) {
            let e = ev || window.event;
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;
            // 限制出界
            // 获取窗口的高度和宽度
            let windowWidth =
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            let windowHeight =
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            if (x <= 0) {
                x = 0;
            }
            if (x >= windowWidth - node.offsetWidth) {
                x = windowWidth - node.offsetWidth;
            }
            if (y <= 0) {
                y = 0;
            }
            if (y >= windowHeight - node.offsetHeight) {
                y = windowHeight - node.offsetHeight;
            }
            node.style.left = x + 'px';
            node.style.top = y + 'px';
        };
    };
    // 鼠标弹起取消拖拽
    document.onmouseup = function () {
        document.onmousemove = null;
    };
}

/**
 *  拖拽  构造函数
 */
function Drag(id) {
    this.oDiv = document.getElementById(id) || document.getElementsByClassName(id) || document.querySelector(id);
    var _this = this;
    this.oDiv.onmousedown = function (ev) {
        _this.funcDown(ev);
    };
    document.onmouseup = this.funcUp;
}

Drag.prototype.funcDown = function (ev) {

    var e = ev || window.event;
    // alert(e.offsetX + ", " + e.offsetY);
    this.offsetX = e.clientX - this.oDiv.offsetLeft;
    this.offsetY = e.clientY - this.oDiv.offsetTop;

    var _this = this;
    document.onmousemove = function (ev) {
        _this.funcMove(ev);
    };

    this.randomColor();
}

Drag.prototype.funcMove = function (ev) {
    var e = ev || window.event;
    this.oDiv.style.left = e.clientX - this.offsetX + 'px';
    this.oDiv.style.top = e.clientY - this.offsetY + 'px';


}
Drag.prototype.funcUp = function () {
    document.onmousemove = null;
}

//添加一个变换随机颜色
Drag.prototype.randomColor = function () {
    var str = "rgba(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + ",1)";
    this.oDiv.style.backgroundColor = str;
}

/* 
    限制出界的拖拽，要拥有拖拽原有的所有功能
*/
function LimitDrag(id) {
    // 继承父一级所有的属性   构造函数的伪装
    Drag.apply(this, [id]);
}

//继承方法   原型链
for (var funcName in Drag.prototype) {
    LimitDrag.prototype[funcName] = Drag.prototype[funcName];
}
LimitDrag.prototype.funcMove = function (ev) {
    var e = ev || window.event;
    var l = e.clientX - this.offsetX;
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    if (l <= 0) {
        l = 0;
    }
    if (l >= windowWidth - this.oDiv.offsetWidth) {
        l = windowWidth - this.oDiv.offsetWidth;
    }

    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var t = e.clientY - this.offsetY;
    if (t <= 0) {
        t = 0;
    }
    if (t >= windowHeight - this.oDiv.offsetHeight) {
        t = windowHeight - this.oDiv.offsetHeight;
    }
    this.oDiv.style.left = l + 'px';
    this.oDiv.style.top = t + 'px';
}


/***************************************************
 *                     tool                        *
 ***************************************************/

function addEvent(node, eventType, funcName) {
    if (node.addEventListener) {
        node.addEventListener(eventType, funcName, false);
    } else {
        node.attachEvent("on" + eventType, funcName);
    }
}

function removeEvent(node, eventType, funcName) {
    if (node.removeEventListener) {
        node.removeEventListener(eventType, funcName);
    } else {
        node.detachEvent("on" + eventType, funcName);
    }
}

/*
	跨浏览器阻止事件冒泡的写法
 */
function stopBubble(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

//忽略空白字符的文本节点。
function removeSpaceNode(node) {
    var nodes = node.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)) {
            //如果符合条件，删除这个节点
            node.removeChild(nodes[i]);
        }
    }
}
//封装一个获取当前有效样式的跨浏览器兼容的方法
function getStyle(node, cssStyle) {
    if (node.currentStyle) {
        return node.currentStyle[cssStyle];
    } else {
        return getComputedStyle(node)[cssStyle];
    }
}


function randomColor() {
    var str = "rgba(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + ",1)";
    return str;
}

/*
	node 从哪个节点开始去找
	classStr 获取class的名字
 */
function elementsByClassName(node, classStr) {
    var result = [];
    var nodes = node.getElementsByTagName("*");
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].className == classStr) {
            result.push(nodes[i]);
        }
    }
    return result;
}

function showTime() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();

    var week = d.getDay();

    week = chineseFormNum(week);
    /*
    	0~6  星期0 周日
     */

    var hour = doubleNum(d.getHours());
    var min = doubleNum(d.getMinutes());
    var sec = doubleNum(d.getSeconds());


    //字符串拼接
    var str = year + "年" + month + "月" + date + "日 星期" + week + " " + hour + ":" + min + ":" + sec;

    return str;
}
//传入数字，返回对应的中文
function chineseFormNum(num) {
    var arr = ["日", "一", "二", "三", "四", "五", "六"];
    return arr[num];
}

//将单位数，变成双位数
function doubleNum(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}

function testCode(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var tmp = parseInt(Math.random() * 123);
        if (tmp >= 0 && tmp <= 9) {
            arr.push(tmp);
        } else if (tmp >= 97 && tmp <= 122 || tmp >= 65 && tmp <= 90) {
            arr.push(String.fromCharCode(tmp));
        } else {
            //没有用的数，也会占用我的循环次数
            i--;
        }
    }

    return arr.join("");
}

function testCodeNum(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        var tmp = parseInt(Math.random() * 10);
        arr.push(tmp);
    }
    return arr.join("");
}


function bubbleSort(arr) {
    //通过冒泡排序从小到大排序
    for (var i = 0; i < arr.length - 1; i++) {
        //每一轮比较的次数
        for (var j = 0; j < arr.length - (i + 1); j++) {
            if (arr[j] > arr[j + 1]) {
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}

function changeSort(arr) {
    //当前的擂台
    for (var i = 0; i < arr.length - 1; i++) {
        //被比较的数
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
}

function norepeat(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            alert(i + ", " + j);
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
}

function norepeat2(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        for (var j = i - 1; j >= 0; j--) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
            }
        }
    }
}