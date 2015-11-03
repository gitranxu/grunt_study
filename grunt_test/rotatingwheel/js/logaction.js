

/*登录注册*/
$(function () {
    //logall.logpassport();
    $('.formbox_hd:eq(0)').find('li:eq(1)').hide();
});
var logall = {
    _ticket: 'e40e7004-4c8a-4963-8564-31271a8337d8',
    _logjs: 'http://js.lefile.cn/s/pp/pp-0.2.0_v20150909.min.js',/*登录*/
    _regjs: 'http://js.lefile.cn/s/pp/rr-0.2.0_v20150909.min.js',/*注册*/
    _logtype: {
        logtype: 0,/*0：正常登陆 1：注册登录*/
        logfn: function () {
            $.ajax({
                url: global_ajaxdomain + 'registnewmember.do',
                data: { lenovoid: passport.cookie.lenovoId },
                type: "get",
                async: false,
                cache: false,
                dataType: "Json",
                error: function (data) {
                    alert('登录失败，错误信息：' + data.statusText + "|" + data.responseText);
                },
                success: function (data) {
                    if (data.rc == "0") { }
                    else {
                        return false;
                    }
                }
            });
        }
    },
    /*加载脚本*/
    loadbyjs: function (_dom) {
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement(_dom.hd);
        oScript.type = _dom.bytype;
        oScript.src = _dom.bysrc;
        oHead.appendChild(oScript);
        oScript.onload = oScript.onreadystatechange = function () {
            if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                if (_dom.fn)
                    _dom.fn();
            }
        }
    },
    /*判断js是否引用*/
    isInclude: function (name) {
        var js = /js$/i.test(name);
        var es = document.getElementsByTagName(js ? 'script' : 'link');
        for (var i = 0; i < es.length; i++)
            if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) return true;
        return false;
    },
    /*登录 初始化*/
    logpassport: function (pfn) {
        if (typeof passport == 'undefined') {
            logall.loadbyjs({
                "hd": "script",
                "bytype": "text/javascript",
                "bysrc": logall._logjs,
                "fn": function () {
                    passport.init({
                        ticket: logall._ticket,
                        login: function () {
                            logall.login_fn();
                        },
                        logout: function () {
                            logall.logout_fn();
                        }
                    });
                    if (pfn) pfn();
                }
            });
        } else
            passport.init({
                ticket: logall._ticket,
                login: function () {
                    logall.login_fn();
                },
                logout: function () {
                    logall.logout_fn();
                }
            });
    },
    /*注册 触发*/
    logrecover_fn: function (pfn) {
        regist.init(logall._ticket);
        $('#ppInfo').delegate('.login', 'click', function () {
            regist.hide();
            openlogin();
        });
        if (pfn) pfn();
    },
    /*登录回调*/
    login_fn: function (pfn) {
        /*登录*/
        if (logall._logtype.logtype == 1) logall._logtype.logfn();
        GetLoginLenovoID();
        passport.hide();
        $('#UserNameID').show().html(GetLoginUserName()).parent().show();;
        $('#headorderID_a').show();
        $('#RegisterID').hide();
        $('#LoginID').hide();
        $('#LogOutID').show();
        if (pfn) pfn();
        else
            if (typeof mycart_login == 'function') mycart_login()
    },
    /*登出回调*/
    logout_fn: function (pfn) {
        deleteCookie(global_loginusername, getCookie(global_loginusername));
        deleteCookie(global_loginlenovoid, getCookie(global_loginlenovoid));
        deleteCookie('usertype', getCookie('usertype'));
        $('#UserNameID').html('').parent().hide();
        $('#headorderID_a').hide();
        $('#RegisterID').show();
        $('#LoginID').show();
        $('#LogOutID').hide();
        if (pfn) pfn();
        else 
            if (typeof mycart_out == 'function') mycart_out();
    }

};

/*登录弹出*/
function openlogin(purl, pfn) {
    logall._logtype.logtype = 0;
    if (GetLoginLenovoID() != null && typeof purl != "undefined") { window.location.href = purl; return false; }
    if (typeof passport == "undefined") {
        logall.loadbyjs({
            "hd": "script",
            "bytype": "text/javascript",
            "bysrc": logall._logjs,
            "fn": function () {
                logall.logpassport();
                temp_openlogin();
            }
        });
    }
    else {
        if (typeof passport.rootElement == "undefined") logall.logpassport();
        temp_openlogin();
    }
   
    var fn_dxm=function()
    {
    	 try{
    	  if(isReloadCurPage)
    	window.location.href = window.location.href;
    	 	
    	 }catch(e){
    	 	//TODO handle the exception
    	 }
    	
    	
    };
    /*登录后事件*/
    function temp_openlogin() {
        if (purl || pfn || fn_dxm) {
            passport.login = function () {
            if (typeof fn_dxm=="function" ) fn_dxm();
                logall.login_fn(pfn);
                if (purl ) window.location.href = purl;
                
            }
        } else {
            passport.login = logall.login_fn;
        }
        passport.show();
        $("body,html").animate({ scrollTop: 0 }, 1);
        $(".regist").click(function () {
            passport.hide();
            logall.logrecover_fn();
        })
        $(".forgetPwd").click(function () {
            passport.hide();
            if (typeof regist == "undefined") logall.logrecover_fn(function () { recover.init(); });
            else
                recover.init();
        });;
    }
}
/*注册弹出*/
function openregister() {
    logall._logtype.logtype = 1;
    if (typeof regist == "undefined") {
        logall.loadbyjs({
            "hd": "script",
            "bytype": "text/javascript",
            "bysrc": logall._regjs,
            "fn": function () {
                logall.logrecover_fn(function () {
                    if (typeof passport == "undefined")
                        logall.logpassport();
                    else
                        if (typeof passport.rootElement == "undefined") logall.logpassport();
                });
            }
        });
    }
    else {
        if (typeof passport == "undefined")
            logall.logpassport();
        else
            if (typeof passport.rootElement == "undefined") logall.logpassport();
        logall.logrecover_fn();
    }
}
//登出操作
function openlogout(purl) {
    var _ologout = function () {
        if (purl)
            passport.logout = function () {
                deleteCookie(global_loginusername, getCookie(global_loginusername));
                deleteCookie(global_loginlenovoid, getCookie(global_loginlenovoid));
                deleteCookie('usertype', getCookie('usertype'));
                deleteCookie('JSESSIONID', getCookie('JSESSIONID'));
                if (typeof mycart_out == 'function') mycart_out();
                window.location.href = purl;
            }
        passport.doLogout();
    };
    if (typeof passport == "undefined") {
        logall.logpassport(_ologout);
    }
    else {
        if (typeof passport.rootElement == "undefined") logall.logpassport();
        _ologout();
    }

}