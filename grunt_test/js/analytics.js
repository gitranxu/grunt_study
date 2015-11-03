/*------------------20150821监控代码------------------*/
var _trackDataType = 'web'; //标记数据来源，参数是web和wap，可以为空，默认是web
var _Schannel_website_id = 'lenovoshop_pc';//分站编号，不存在可不写此变量或者留空
var _Schannel_webshop_id = '';//商铺编号，不存在可不写此变量或者留空
var _trackData = _trackData || [];//必须为全局变量，假如之前并没有声明，请加此行代码；

var laurl = "http://js.lefile.cn/s/la/la_v13.min.js";

function loadScript(url, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) { //IE 
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
            script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others: Firefox, Safari, Chrome, and Opera 
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.body.appendChild(script);
}

$(function () {
    loadScript(laurl, function () {
        if (typeof (la_callback) != 'undefined' && la_callback) {
            la_callback();
        }
    });
});