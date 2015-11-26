/* -------------- 通用JS  20150910  荆宝梁 v2 -------------- */

/*------------------Page Loaded---------------------*/
var globalconfig = {
    platid: 8                 /*平台号*/
}

$(function () {

    //初始化登录
    logobj.init();

    //窗口改变时重新定位
    jQuery(window).resize(function () {
        alertPosition();
    }).scroll(function () {

    })
});

/*------------------用户登录/注册---------------------*/

var logobj = {
    _logurl: $GRUNTCONFIG.DEV.ssourl,  /*跳转登录*/
    //配置
    config: {
        ticket: "ad68e8e1-b719-443e-aa0f-d5fcbcdd83ae",
        login: function () {
            if (typeof login_callback == 'undefined') {
                $(".ellipsis").html(passport.cookie.loginName);
                $(".think_login").hide();
                $(".think_register").show();
                //navpadding.logined();
                if($p&&$p.sc){$p.sc()};
            }
            else {
                login_callback();
            }
        },
        logout: function () {
            if (typeof logout_callback == 'undefined') {
                $(".think_login").show();
                $(".think_register").hide();
                //navpadding.unlogin();
                //window.location.href = "http://" + window.location.host;
            }
            else {
                logout_callback();
            }
        }
    },
    //初始化
    init: function () {
        passport.init(logobj.config);
    },
    //login
    showlogin: function (fn) {

        if (fn && typeof fn == "function") {
            passport.login = fn;
        } else {
            passport.login = this.config.login;
        }

        passport.show();

        $(".regist").click(function () {
            passport.hide();
            logobj.showregist();
        });
        $(".forgetPwd").click(function () {
            passport.hide();
            recover.init();
        });
    },
    //regist
    showregist: function () {
        //regist.init(logobj.config.ticket);
        regist.init({
            ticket: logobj.config.ticket,
            success: logobj.config.login
        });
    },
    //logout
    dologout: function () {
        passport.doLogout();
    }

}

/*------------------延时加载js---------------------*/

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


/*------------------Cookie操作---------------------*/

//添加Cookie
function addCookie(name, value, expiresdays) {
    var cookieString = name + "=" + escape(value) + ';path=/';

    if (expiresdays != 0 && expiresdays != '' && expiresdays != null) {
        var date = new Date();
        date.setTime(date.getTime + expiresdays * 24 * 3600 * 1000);
        cookieString = cookieString + "; expires=" + date.toGMTString();
    }

    document.cookie = cookieString;
}
//获取Cookie
function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name) return unescape(arr[1]);
    }
    return null;
}
/*--------------------判断是否登录-------------------------*/
function isLogin() {
	if (window.passport && passport.isLogin()) {
		var url=$GRUNTCONFIG.DEV.thinkpcdomainurl;
        window.location.href = url+"/user/index.html";
    }
    else {
    	logobj.showlogin();
    }
}
/*------------------登录方法---------------------*/
//登录方法，需要传入登录成功后跳转页面
function LoginLenovo(URL) {
    var loginUrl = logobj._logurl + "?ticket=" + logobj.config.ticket + "&ru=" + URL;
    window.top.location.href = loginUrl;
}


/*------------------通用弹出框---------------------*/
//loading
function showLoading() {
    if (jQuery("#loading_box").length == 0) {
        jQuery("body").append("<div class='pop loading' id='loading_box'><img src='/images/loading1.gif'></div>");
    }
    jQuery("#loading_box").show();
}
//loading隐藏
function hideLoading() {
    if (jQuery("#loading_box").length != 0) {
        jQuery("#loading_box").hide();
    }
}
//提示信息Alert
function alertBox(conts, states) {
    var src;
    if (jQuery("#mask0").length == 0) {
        jQuery("body").append("<div id='mask0'/>")
    }
    jQuery("#mask0").show();
    if (jQuery(".alert_tip").length == 0) {
        var str = '<div class="alert_tip"><i class="alert_close"></i><div class="clear"></div><div class="alert_cont"><div class="txt"></div></div></div>';
        jQuery("body").append(str);
    }
    var _alert = jQuery(".alert_tip"), _alert_cont = jQuery(".alert_cont");
    if (states == 1) {
        _alert_cont.removeClass("e1");
    } else {
        _alert_cont.addClass("e1");
    }
    _alert_cont.children(".txt").html(conts);

    _alert.show();
    _alert_cont.children(".txt").css("marginTop", (60 - _alert_cont.children(".txt").height()) / 2 + "px");
    alertPosition();
    var thr = arguments[2];
    jQuery(".alert_close").click(function () {
        jQuery("#mask0,.alert_tip").hide();
        if (thr) window.location.reload();
    })
}
//计算alert显示位置
function alertPosition() {
    if (jQuery(".alert_tip").is(":visible"))
        jQuery(".alert_tip").css({ top: ($(window).height() - jQuery(".alert_tip").height()) / 2 + "px", left: (jQuery(window).width() - jQuery(".alert_tip").width()) / 2 + "px" });
}
//创建alert及mask
function messageBox(boxTitle, html) {
    if (jQuery("#mask").length == 0) {
        jQuery("body").append("<div id='mask'/>");
    }
    jQuery("#mask").show();
    if (jQuery("#messageBox").length == 0) {
        var str = '<div class="u_box order_1" id="messageBox"><div class="u_box_title"><i id="close_btn"></i><div id="box_title"></div></div><div id="box_info"></div></div>';
        jQuery("body").append(str);
    }
    var _messageBox = jQuery("#messageBox");
    $("#box_title").html(boxTitle);
    $("#box_info").html(html);

    _messageBox.show();
    boxPosition();

    jQuery("#close_btn").click(function () {
        jQuery("#mask,#messageBox").hide();
    });
}
//计算alert显示位置
function boxPosition() {
    if (jQuery("#messageBox").is(":visible")) {
        jQuery("#messageBox").css({ "margin-top": (-jQuery("#messageBox").height() / 2) + "px", "margin-left": (-jQuery("#messageBox").width() / 2) + "px" });
    }

}
//创建alert及mask--iframe
function iframeBox(title, width, height, url) {
    if (jQuery("#mask").length == 0) {
        jQuery("body").append("<div id='mask'/>");
    }
    jQuery("#mask").show();
    if (jQuery("#iframeBox").length == 0) {
        var str = '<div class="u_box order_1" id="iframeBox"><div class="u_box_title"><i id="close_btn"></i><div id="box_title"></div></div><iframe id="box_info" src="' + url + '" scrolling="no" style="display:block;margin:0px auto;" frameborder="0" height=' + height + ' width=' + width + '></iframe></div>';
        jQuery("body").append(str);
    }
    var _messageBox = jQuery("#iframeBox");
    $("#box_title").html(title);
    $("#box_info").attr("src", url);
    $("#box_info").attr("width", width);
    $("#box_info").attr("height", height);
    _messageBox.show();
    iframeboxPosition();

    jQuery("#close_btn").click(function () {
        jQuery("#mask,#iframeBox").hide();
        window.location.reload();
    });
}
function iframeClose(msg) {
    if (msg != "") { alert(msg) }
    $("#mask").hide();
    $("#iframeBox").remove();
}
//计算alert显示位置
function iframeboxPosition() {
    if (jQuery("#iframeBox").is(":visible")) {
        jQuery("#iframeBox").css({ "margin-top": (-jQuery("#iframeBox").height() / 2) + "px", "margin-left": (-jQuery("#iframeBox").width() / 2) + "px" });
    }

}


