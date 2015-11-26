/// PC端common.js

/*ajax请求域地址*/
var global_ajaxdomain = "http://www.lenovouat.cn/srv/";

/*搜索地址*/
var global_search = "http://www.lenovouat.cn/search/";

/*搜索地址新*/
var global_newsearch = "http://www.lenovouat.cn/nsearch/";

/*网站地址*/
var global_ajax = 'http://www.lenovouat.cn/';

/*WebChat地址*/
var global_webchat = 'http://www.lenovouat.cn/chat.html';


//1 WAP ,2 微信,3 APP,4 PC
var global_platid = 4;

//定义全局变量用户名
var global_loginusername = 'lenovocurrentusername';
//定义全局变量lenovoid
var global_loginlenovoid = 'lenovocurrentlenovoid';
//定义全局变量用户类型
var global_usertype = 'usertype';
//定义对比的列表名称
var global_productlistname = 'lenovoproductlistname';
var global_ticket = 'e40e7004-4c8a-4963-8564-31271a8337d8';
/*单点登录跳转网站地址*/
var sso_global_ajax = 'https://reg.lenovouat.cn/auth/v1/login';
/*单点登录ticket*/
var sso_ticket = 'e40e7004-4c8a-4963-8564-31271a8337d8';
//定义获取参数方法，输入参数名称，获得参数值
$.getUrlParam = function (commonname) {
    var reg = new RegExp("(^|&)" + commonname + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
function GetLoginUserName() {
    if (GetLoginLenovoID() == null) return null;
    //alert(0);
    var globalname = getCookie(global_loginusername);
    if ($.trim(globalname) == null || $.trim(globalname) == '' || $.trim(globalname) == 'null' || $.trim(globalname) == undefined) {
        return null;
    }
    // alert(globalname);
    return globalname;
}
function GetLoginLenovoID() {
    var globallenovoid = getCookie(global_loginlenovoid);
    var globalname = getCookie(global_loginusername)
    if (typeof passport == "undefined") {
        if (globallenovoid) {
            return globallenovoid;
        }
        // alert('passport'+passport);
        return null;
    }
    // alert('here');
    if (passport.isLogin()) {
        //alert('login');
        if (passport.cookie.lenovoId != globallenovoid || !globalname) {
            deleteCookie(global_loginusername, getCookie(global_loginusername));
            deleteCookie(global_loginlenovoid, getCookie(global_loginlenovoid));
            deleteCookie('usertype', getCookie('usertype'));
            addCookie(global_loginlenovoid, passport.cookie.lenovoId, 30);
            getUserInfo();
        }
        //alert('passport.cookie.lenovoId'+passport.cookie.lenovoId);
        return passport.cookie.lenovoId;
    }
    return null;
}

function getUserInfo() {
    $.ajax({
        url: global_ajaxdomain + 'synchronizememinfo.do',
        type: "get",
        async: false,
        cache: false,
        dataType: "Json",
        error: function (data) { alert('登录失败，错误信息：' + data.statusText + "|" + data.responseText); },
        success: function (data) {
            if (data.rc == "0") { }
            else {
                return false;
            }
        }
    });
    $.ajax({
        url: global_ajaxdomain + 'getusername.do',
        type: "get",
        async: false,
        cache: false,
        dataType: "Json",
        error: function (data) { alert('登录失败，错误信息：' + data.statusText + "|" + data.responseText); },
        success: function (data) {
            if (data != null && data.username != undefined && data.rc == "0") {
                addCookie(global_loginusername, data.username, 30);
                addCookie(global_loginlenovoid, passport.cookie.lenovoId, 30);
                addCookie('usertype', data.usertype, 30);
            }
        }
    });
    window.location.reload();
}


//跳转到客服
function LoginWebChat(p, o) {
    var weburl = global_webchat + '?s=0';//客服专用平台编号：0:pc,1:wap，2：weixin，3：app
    var u = GetLoginUserName();
    if (u != null && u != '' && u != "null") {
        weburl += '&u=' + encodeURIComponent(u);
    }
    if (p)
        weburl += '&p=' + p;
    if (o)
        weburl += '&o=' + o;
    window.open(weburl);
    //window.location.href = weburl;
}

//登录方法，需要传入登录成功后跳转页面
function LoginLenovo(URL) {

    ////跳转到中转页面
    //URL = global_ajax + 'loginhub.html?targetpath=' + URL;
    ////访问登录方法
    //var LoginURL = global_ajaxdomain + 'tologin.do?URL=' + URL + '&plat=' + global_platid;
    ////跳转页面
    SSOLoginLenovo(URL);
}
//单点登录统一跳转页面
function SSOLoginLenovo(URL) {
    //跳转单点登录中转页面
    var LoginURL = sso_global_ajax + '?ticket=' + sso_ticket + '&ru=' + URL;
    //跳转页面
    window.location.href = LoginURL;
}
////自动登陆
//if (!$.$isredirect && location.href.indexOf('loginhub') < 0) {
//    var cookieUN = "LenovoID.UN";
//    var cookieState = "LPSState";
//    var LENOVOID = {}
//    LENOVOID.getcookie = function (name) {
//        var cookie_start = document.cookie.indexOf(name);
//        var cookie_end = document.cookie.indexOf(";", cookie_start);
//        return cookie_start == -1 ? '' : document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length));
//    };
//    var cookievalue = LENOVOID.getcookie(cookieUN);
//    var cookierealm = LENOVOID.getcookie(cookieState);
//    if (null != cookievalue && cookievalue != '""' && cookievalue.length > 0 && (GetLoginUserName() == null || GetLoginUserName() == "" || GetLoginUserName() == "null")) {
//        LoginLenovo(location.href);
//    }
//}


////重置用户名密码功能
//function ResetLoginPassword() {
//    var LoginURL = global_ajaxdomain + 'resetpassword.do?plat=' + global_platid + '&URL=' + global_ajax + 'index.html';
//    window.open(LoginURL);
//}

////登出操作
//function LogOut() {
//    passport.doLogout();
//    //var LoginURL = global_ajaxdomain + 'logout.do?URL=' + global_ajax + 'index.html&plat=' + global_platid;
//    //window.location.href = LoginURL;
//}
///*登陆*/
//function PCLogin() {
//    if (passport)
//        passport.show();
//    else {
//        logall.logpassport();
//        passport.show();
//    }
//    //LoginLenovo(window.location.href);
//}

//添加Cookie
function addCookie(name, value, expiresdays) {
    var cookieString = name + "=" + escape(value) + ';path=/';

    if (expiresdays != 0 && expiresdays != '' && expiresdays != null) {
        var date = new Date();
        date.setTime(date.getTime() + expiresdays * 24 * 3600 * 1000);
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

//删除Cookie
function deleteCookie(name, value) {
    var cookieString = name + "=" + escape(value);
    var cookiedate = new Date();
    cookiedate.setTime(cookiedate.getTime() - 1);
    cookieString = cookieString + "; expires=" + cookiedate.toGMTString() + ";path=/";
    document.cookie = cookieString;
}




$(function () {
    if (typeof $.getUrlParam == 'undefined')
        //定义获取参数方法，输入参数名称，获得参数值
        $.getUrlParam = function (commonname) {
            var reg = new RegExp("(^|&)" + commonname + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]); return null;
        }
    /*URL登录判断*/
    IsMemberinfo();
    /*加载头部*/
    if ($("#head_div").length == 1) {
        var ts = "";
        if ($("#head_div_time").length == 1) {
            var ts = $("#head_div_time").val();
            addCookie("head_div_time", ts)
        }
        else {
            ts = getCookie("head_div_time");
            if (ts == null) {
                ts = new Date().getMilliseconds();
            }
        }
        $("#head_div").load("/head.html?ts=" + ts, function () {
            var oHead = document.getElementsByTagName('HEAD').item(0);
            var oScript = document.createElement("script");
            oScript.type = "text/javascript";
            oScript.src = "/js/logaction.js";
            oHead.appendChild(oScript);

            setNav();
            bindkeyup();
            /*加载通知*/
            if ($("#J-site-info-ul").length == 1) {
                $.ajax({
                    type: "get",
                    url: "/notice.html",
                    cache: false,
                    async: false,
                    success: function (data) {
                        if (data != "") {
                            $("#J-site-info-ul").html(data);
                            $("#site-info").show();
                            setNotice();
                        }
                        else {
                            //$("#site-info").hide();
                        }
                    }
                });
            }
            /*获取搜索Key值*/
            if ($.getUrlParam("key") != null && $.getUrlParam("key") != '') {
                $(".ns_s-combobox-input").val($.getUrlParam("key"));
            }
            /*约我效果*/
            $('.ns_top_title').bind('mouseenter', function () {
                $(this).siblings('ul').stop(true, true).slideDown(300);
                $(this).find('a').removeClass('ns_top_down').addClass('ns_top_up');

            });
            $('.ns_top_link').bind('mouseleave', function () {
                $(this).find('ul').stop(true, true).slideUp(300);
                $(this).find('.ns_top_title').find('a').removeClass('ns_top_up').addClass('ns_top_down');
            })
        });
    }
    else {
        bindkeyup();
        if ($("#head_div_temp").length == 1) {
            /*加载通知*/
            if ($("#J-site-info-ul").length == 1) {
                $.ajax({
                    type: "get",
                    url: "/notice.html",
                    cache: false,
                    async: false,
                    success: function (data) {
                        if (data != "") {
                            $("#J-site-info-ul").html(data);
                            $("#site-info").show();
                            setNotice();
                        }
                        else {
                            //$("#site-info").hide();
                        }
                    }
                });
            }
            /*获取搜索Key值*/
            if ($.getUrlParam("key") != null && $.getUrlParam("key") != '') {
                $(".ns_s-combobox-input").val($.getUrlParam("key"));
            }
            /*约我效果*/
            $('.ns_top_title').bind('mouseenter', function () {
                $(this).siblings('ul').stop(true, true).slideDown(300);
                $(this).find('a').removeClass('ns_top_down').addClass('ns_top_up');

            });
            $('.ns_top_link').bind('mouseleave', function () {
                $(this).find('ul').stop(true, true).slideUp(300);
                $(this).find('.ns_top_title').find('a').removeClass('ns_top_up').addClass('ns_top_down');
            })
        }
        setNav();
    }

    /*加载尾部*/
    if ($("#foot_div").length == 1) {
        $("#foot_div").load("/foot.html", function () {
            var oChild = document.getElementById('gq_box');
            var oParent = document.getElementById('b_bit');
            var sTime;
            oParent.onmouseover = oChild.onmouseover = function () {
                clearTimeout(sTime);
                sTime = setTimeout(function () {
                    oChild.style.display = 'block';
                }, 200);
            };
            oParent.onmouseout = oChild.onmouseout = function () {
                clearTimeout(sTime);
                sTime = setTimeout(function () {
                    oChild.style.display = 'none';
                }, 200);
            };
        });
    }
    /*加载后事件*/
    function bindkeyup() {
        $(".ns_s-combobox-input").keyup(function (event) {
            event = event || window.event;
            if (event.keyCode == 13) {
                openproductlist();
            }
        });
        /*临时修改页面元素*/
        try {
            $(".ns_hot-query.clearfix>li").eq(3).find("a").attr("href", "http://www.tks.lenovouat.cn/pm/search.html?q=carbon&type=0");
            $("#J_MUIMallbar").find("li").eq(1).find("a").attr("href", "http://appserver.lenovouat.cn/LenovoMap/LenovoMap_Direct.aspx?intcmp=MAP20140730_1");
        } catch (e) {

        }

    }
});




/*导航*/
function setNav() {
    $(".nav-category-item").hover(function () {
        $(this).addClass("nav-now").find(".nav_category_children").show();
    }, function () {
        $(this).removeClass("nav-now").find(".nav_category_children").hide();
    })
    $(".nav_category_children").hover(function () {
        $(this).show().parents(".nav-category-item").addClass("nav-now");
    }, function () {
        $(this).hide();
    })




    var shopLenovo = {};
    shopLenovo.nav = {
        init: function () {
            var _self = this;
            _self.timer = null;
            this.mainNav = $("#main-nav");
            this.navH = this.mainNav.find(".ns_menu-title");
            this.nav = $("#menu-nav-container");
            this.categoryMenu = $("#category-menu-content");
            this.categoryPannel = $(".ns_category-menu-pannel");
            this.categorySub = $("#category-sub-content");
            this.categorySubPannel = $(".ns_category-sub-pannel");
            /*新导航*/
            this.new_navH = this.mainNav.find(".btn_category_all");
            this.new_nav = $("#nav-category-section");
            if (!this.new_nav.is(":visible")) {
                this.new_navH.bind("mouseover", function () {
                    _self.new_nav.show();//.stop().slideDown();
                });
                this.mainNav.bind("mouseleave", function () {
                    _self.new_nav.hide();//.stop().slideUp();
                });
            };
            /*end新导航*/
            /*三级菜单折行处理*/
            this.categorySubPannel.each(function (_index) {
                var n_item = $(this).find(".ns_item");
                var n = n_item.length;
                var subPan = "";
                if (n > 6) {
                    var maxL = Math.ceil(n / 6);
                    for (var t = 1; t <= maxL; t++) {
                        n_item.eq(t * 6 - 1).after("<div class='ns_clear'></div>");
                    };
                };
            });

            this.li = this.nav.find("li");


            /*判断是否存在二级菜单*/
            this.categoryPannel.each(function (_index) {
                if ($(this).find("li").length <= 1) {
                    _self.li.eq(_index).attr("sj", "0");
                };
            });

            this.sub_li = this.categoryMenu.find("li");

            if (!this.nav.is(":visible")) {
                this.navH.bind("mouseover", function () {
                    _self.nav.stop().slideDown();
                });
                this.mainNav.bind("mouseleave", function () {
                    _self.nav.stop().slideUp();
                });
            };
            this.li.bind("mouseover", function () {
                clearTimeout(_self.timer);
                _self.li.removeClass("ns_on");
                $(this).addClass("ns_on");
                var _index = $(this).index();

                //document.title = _self.categoryPannel.eq(_index).length;
                if (_self.categoryPannel.eq(_index).length <= 0) {
                    _self.sub_li.removeClass("ns_on");
                    _self.categorySub.hide();
                    _self.categoryMenu.hide();
                    _self.categoryPannel.hide();
                    return false;
                };
                //如果没有二级菜单
                if (_self.categoryPannel.eq(_index).find("li").length <= 1) {
                    var _subIndex = 0;
                    var _subTab = $(this).index() + 1;
                    var _subBox = $(".ns_category-" + _subTab + "-pannel-sub").find(".ns_category-sub-pannel").eq(_subIndex);
                    //document.title = _subBox.is(":visible");
                    if (!_subBox.is(":visible")) {
                        if (_subBox.length <= 0) {
                            _self.categorySub.hide();
                        } else {
                            _self.categorySubPannel.hide();
                            _subBox.show();
                            _self.categorySub.css({ left: 210, opacity: 0 });
                            _self.categorySub.show();
                            _self.categorySub.animate({ left: 226, opacity: 1 }, 250)
                        };
                    };
                    _self.categoryMenu.hide();
                    return false;
                }
                if (_self.categoryPannel.eq(_index).is(":visible")) return false;
                _self.sub_li.removeClass("ns_on");
                _self.categorySub.hide();
                _self.categoryMenu.hide();
                _self.categoryPannel.hide();
                _self.categoryMenu.css({ left: "210px", opacity: 0 });
                _self.categoryMenu.hide();
                _self.categoryMenu.show();
                _self.categoryPannel.eq(_index).show();
                _self.categoryMenu.animate({ left: "226px", opacity: 1 }, 250);
            });
            this.categoryMenu.bind("mouseover", function () {
                clearTimeout(_self.timer);
            });
            this.nav.bind("mouseout", function () {
                _self.timer = setTimeout(function () {
                    _self.hideNav();
                }, 100);
            });
            this.categoryMenu.bind("mouseout", function () {
                _self.timer = setTimeout(function () {
                    _self.hideNav();
                }, 500);
            });

            this.categorySub.bind("mouseover", function () {
                clearTimeout(_self.timer);
            });
            this.categorySub.bind("mouseout", function () {
                _self.timer = setTimeout(function () {
                    _self.hideNav();
                }, 100);
            });

            this.sub_li.bind("mouseover", function () {
                _self.sub_li.removeClass("ns_on");
                $(this).addClass("ns_on");
                var _subIndex = $(this).index();
                var _subTab = $(this).parents(".ns_category-menu-pannel").attr("data-sub");
                var _subBox = $(".ns_category-" + _subTab + "-pannel-sub").find(".ns_category-sub-pannel").eq(_subIndex);
                //document.title = _subBox.is(":visible");
                if (!_subBox.is(":visible")) {
                    if (_subBox.length <= 0) {
                        _self.categorySub.hide();
                    } else {
                        _self.categorySubPannel.hide();
                        _subBox.show();
                        _self.categorySub.css({ left: 386, opacity: 0 });
                        _self.categorySub.show();
                        _self.categorySub.animate({ left: 396, opacity: 1 }, 250)
                    };
                };
            });
        },
        hideNav: function () {
            var _self = this;
            _self.li.removeClass("ns_on");
            _self.categoryMenu.animate({ left: 200, opacity: 0 }, 250, function () {
                _self.categoryMenu.hide();
            });
            _self.categorySub.animate({ left: 366, opacity: 0 }, 250, function () {
                _self.categorySub.hide();
            });
        }
    };
    //获取窗口高宽
    shopLenovo.getW = function () {
        var client_h, client_w, scrollTop;
        client_h = document.documentElement.clientHeight || document.body.clientHeight;
        client_w = document.documentElement.clientWidth || document.body.clientWidth;
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        return o = { w: client_w, h: client_h, s: scrollTop };
    }
    var isIe6 = false;
    if ($.browser.msie && parseInt($.browser.version) == 6) {
        isIe6 = true;
    };

    //左侧浮动栏
    shopLenovo.bar = {
        init: function () {
            this.box = $("#J_MUIMallbar");
            this.tab = this.box.find(".ns_mbar-tab");
            var _self = this;
            this.timer;
            this.box.bind("mouseover", function () {
                clearTimeout(_self.timer);
            });

            var setWinTimer = null;
            $(window).bind("resize", function () {
                setWinTimer = setTimeout(function () {
                    setWin();
                }, 200);
            });

            $(window).bind("scroll", function () {
                timer = setTimeout(function () {
                    var p = document.body.scrollTop || document.documentElement.scrollTop;
                    if (isIe6) {
                        _self.box.stop().animate({ top: shopLenovo.getW().h / 2 + p });
                    };

                }, 100);
            });


            function setWin() {
                var win = shopLenovo.getW();
                if (win.w <= 1250) {
                    _self.box.addClass("ns_mui-mbar-outer_on");
                    $("#J-floor-nav-box").addClass("ns_floor-nav-box_on");
                } else {
                    _self.box.removeClass("ns_mui-mbar-outer_on");
                    $("#J-floor-nav-box").removeClass("ns_floor-nav-box_on");

                };
                $("#J-collection-box").css({ height: win.h - 2, "margin-top": -win.h / 2 + 47 });
                $("#J-collection-box").find(".ns_mbar-inner").css({ height: win.h - 4 });
            };
            setWin();
            $("#J-collection-box .ns_btnUp").bind("click", function () {
                $("#J-collection-box .ns_mbar-inner").animate({
                    scrollTop: 0
                }, 500
                );
            });

            this.tab.bind("mouseover", function () {
                //document.title = 1;		
                //clearTimeout(_self.timer);
                if ($(this).find(".ns_mbar-li").is(":visible")) return false;
                _self.box.find(".ns_mbar-li").hide();
                $(this).find(".ns_mbar-li").css({ opacity: 0, left: 35 });
                $(this).find(".ns_mbar-li").animate({ "left": "44px", opacity: 1 }, 250);;
                $(this).find(".ns_mbar-li").show();
            });
            this.tab.bind("mouseleave", function () {
                var obj = $(this).find(".ns_mbar-li");
                _self.timer = setTimeout(function () {
                    obj.animate({ "left": "35px", "opacity": 0 }, 250, function () {
                        obj.hide();
                    });
                }, 200);
            });
        }
    };
    shopLenovo.nav.init();
    shopLenovo.bar.init();
    setCategoryProduct();
}

/*根据类别显示不同产品*/
function setCategoryProduct() {
    var ns_start_num = 1;
    $(".nav-category-item").bind("mouseover", function () {
        if ($(this).index() < 7) {
            if (ns_start_num == $(this).index()) return false;
            if ($(this).index() == 1) {
                ns_start_num = 2;
            } else
                ns_start_num = $(this).index();
            if ($("#start-list-" + (ns_start_num + 1)).find("a").length > 0) {
                $(".banner_bottom_hot").hide();
                $("#start-list-" + (ns_start_num + 1)).fadeIn(200);
            }
        };
    });
}

/*新闻公告*/
function setNotice() {
    var shopLenovo = {}
    shopLenovo.siteInfo = {
        init: function () {
            var _self = this;
            this.box = $("#J-site-info-ul");
            this.li = this.box.find("li");
            _self.timer = setInterval(function () {
                move();
            }, 5000);
            function move() {
                _self.li = _self.box.find("li");
                var h = _self.li.eq(0).outerHeight(true);
                _self.li.eq(0).animate({ "margin-top": -h }, function () {
                    _self.box.append(_self.li.eq(0));
                    _self.li.eq(0).css({ "margin-top": "0" });
                });

            };
        }
    };

    shopLenovo.siteInfo.init();
}

//页面加载Tab页
function ns_tab(tabId, conId, n, l) {
    for (var i = 1; i <= l; i++) {
        $("#" + tabId + i).removeClass("ns_on");
        $("#" + conId + i).hide();
    };
    $("#" + tabId + n).addClass("ns_on");
    $("#" + conId + n).show();
};

//验证邮件
function chkmail(str) {
    var myReg = /^[\._\-a-zA-Z0-9]+@([_a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,3}$/;
    if (!myReg.test(str))
        return false;
    else
        return true;
}
//验证电话
function chkphone(str) {
    var myReg = /(^[0-9]{3,4}\-[0-9]{6,8}$)|(^[0-9]{6,8}$)|(^\([0-9]{3,4}\)[0-9]{6,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)/;
    if (!myReg.test(str))
        return false;
    else
        return true;

}
//验证手机
function IsMobile(val) {
    if (val == "") {
        return false;
    }
    var regMobel0 = /^1\d{10}$/;
    var regMobel1 = /^01\d{10}$/;
    //var regMobel0 = /^13\d{9}$/;
    //var regMobel1 = /^15\d{9}$/;
    //var regMobel2 = /^18\d{9}$/;
    //var regMobel3 = /^013\d{9}$/;
    //var regMobel4 = /^015\d{9}$/;
    //var regMobel5 = /^018\d{9}$/; 
    //if (regMobel0.test(val) || regMobel1.test(val) || regMobel2.test(val) || regMobel3.test(val) || regMobel4.test(val) || regMobel5.test(val)) {
    if (regMobel0.test(val) || regMobel1.test(val)) {
        return true;
    } else {
        return false;
    }
}

//列表没有内容，调用此HTML
function ShowNoDate(NoDateTips, type) {
    var NoDateHTML = '<div class="prompt"><h3><img src="../images/menu_ad.jpg"><span>' + NoDateTips + '</span></h3></div>';

    if (type == '1') {
        NoDateHTML = '<div class="prompt2"><div class="prompt2_body"><img class="xiaoxin" src="../images/menu_ad.jpg"><div class="prompt2_info"><h3><span>温馨提示：暂时没有任何数据</span></h3></div> </div></div>';
    }

    return NoDateHTML;
}

//公共的分页方法
function GetDataByPage(searchmethod, url, pageid, listid, pagename, pageindex, totalcount) {
    laypage({
        cont: pageid,//分页控件的ID
        pages: totalcount, //总页数
        curr: pageindex, //当前页
        jump: function (e) {
            //进行分页
            if (pageindex != e.curr) {
                $.ajax({
                    url: url + '&' + pagename + '=' + e.curr,
                    type: "get",
                    async: false,
                    cache: false,
                    dataType: "json",
                    error: function (ex) { $('#' + pageid).hide(); $('#' + listid).html(ShowNoDate("温馨提示：暂时没有任何数据")); },
                    success: function (data) {
                        if (data != null && data.rc == "0" && data.totalpagecount > 0) {
                            $('#' + pageid).show();
                            searchmethod(data);
                            GetDataByPage(searchmethod, url, pageid, listid, pagename, e.curr, data.totalpagecount);
                        }
                        else if (data != null && data.rc == "401") {
                            LoginLenovo($('#hiddenurl').val());
                        }
                        else {
                            $('#' + pageid).hide();
                            $('#' + listid).html(ShowNoDate("温馨提示：暂时没有任何数据"));
                        }
                    }
                });
            }
        }
    });
}

//公共的弹窗方法
function showAlert(time) {
    var alert_w = $(".alert").width();
    $(".alert").fadeIn();
    $(".alert").css({ "margin-left": -alert_w / 2 });
    setTimeout(function () {
        $(".alert").fadeOut();
    }, time)
}

//公共的弹窗方法
function showMessage(time, text, url) {
    var $newdiv = $("<div class='alert'></div>");
    var div_html = '';
    div_html += '<div class="alert_body">';
    div_html += '<img src="/images/information.png" />&nbsp;&nbsp;';
    div_html += '<span>' + text + '</span>';
    div_html += '</div>';
    $newdiv.append(div_html);
    $('body').append($newdiv);
    var alert_w = $newdiv.width();
    $newdiv.fadeIn();
    $newdiv.css({ "margin-left": -alert_w / 2 });
    setTimeout(function () {
        $newdiv.fadeOut(function () { $newdiv.remove(); });
        if (url) {
            window.location.href = url;
        }
    }, time);
}

//公共的遮罩方法
function opencover(title, tips, method) {
    var pc_coverhtml = '';
    pc_coverhtml += '<div id="divcoverhtml_pcid">';
    pc_coverhtml += '    <div class="grey"></div>';
    pc_coverhtml += '    <div class="selectbox">';
    pc_coverhtml += '        <div class="box-top">';
    pc_coverhtml += '            <span>' + title + '</span>';
    pc_coverhtml += '            <a onclick="closecover()" class="closebtn" id="closebtn" style="cursor:pointer"><img src="../images/close.png" /></a>';
    pc_coverhtml += '        </div>';
    pc_coverhtml += '        <div class="box_btm">';
    pc_coverhtml += '            <img src="../images/warn.png" alt="" />';
    pc_coverhtml += '            <div class="cont"><p class="red">提示</p><p>' + tips + '</p></div>';
    pc_coverhtml += '        </div>';
    pc_coverhtml += '        <div class="tijiao">';
    pc_coverhtml += '            <a onclick="' + method + '" class="btn now" style="cursor:pointer;text-decoration:none"> 确 定 </a>';
    pc_coverhtml += '            <a onclick="closecover()" class="btn" style="cursor:pointer;text-decoration:none"> 取 消 </a>';
    pc_coverhtml += '        </div>';
    pc_coverhtml += '    </div>';
    pc_coverhtml += '</div>';

    $('body').append(pc_coverhtml);
}

function closecover() {
    $('#divcoverhtml_pcid').remove();
}



/*搜索回车*/
function headkeypress() {
    if (event.keyCode == 13) {
        openproductlist();
    }
}

/*头部搜索查询*/
function openproductlist() {
    var p = $(".ns_s-combobox-input").val();
    if (p == "输入商品名称") p = "";
    //var herfPath = "";
    //if (location.href.replace(/(.+?:\/\/.+?\/).*$/g, '$1') != location.href.replace(/(.+\/).*$/g, '$1')) {
    //    herfPath = "../";
    //}
    var keyexg = {
        key: ["笔记本", "手机", "平板电脑", "台式机", "服务"],
        urlcode: ["1", "3", "4", "2", "5"]
    }

    for (var i = 0; i < keyexg.key.length; i++) {
        if (p.indexOf(keyexg.key[i]) >= 0) {
            window.location.href = "/search-" + keyexg.urlcode[i] + ".html?key=" + p + "&ty=1";
            return;
        }
    }
    window.location.href = "/search-1.html?key=" + p;
}

/*客服咨询*/
function openwebchat() {
    var p = "";
    var o = "";
    if (typeof (ginfo) != "undefined") {
        p = ginfo.gcode;
    }
    if ($('#hiddenorderno').length > 0) {
        o = $('#hiddenorderno').val();
    }
    LoginWebChat(p, o);
}
//放大图片
function showBig(src) {
    var showdiv = $('<div id="showBig_box"><a><img class="big_pro" src="' + src + '" ></a><div class="showBig_bg"></div></div>');
    var hidea = $('<span class="closeBig"><img src="/images/delate_cha.png"></span>');
    hidea.click(function () {
        $("#showBig_box").remove();
    });
    showdiv.find("a").append(hidea);
    $("body").append(showdiv);
    $("#showBig_box").show();
}




/*******************piwik_new_begin*********************/
//监控站点URL
var global_monitorurl = "//shop.click.lenovo.com.cn/collect";
var global_monitorjs = "//shop.click.lenovo.com.cn/analytics.js";
//监控基本站点ID
var global_monitorid = 18;
//监控摇钱树站点ID
var global_monitorid_mbg = 25;
var _paq = _paq || [];
function piwik_loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (callback)
        script.onload = script.onreadystatechange = function () {
            if (script.readyState && script.readyState != 'loaded' && script.readyState != 'complete')
                return;
            script.onreadystatechange = script.onload = null;
            callback();
        };
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function piwik_pc_track_event(category, action, json_data) {
    try {
        var obj = Piwik.getAsyncTracker();
        obj.setCustomData(json_data);
        obj.setSiteId(global_monitorid);
        obj.trackEvent(category, action, 'data', 1);
    } catch (err) {
        if (console) {
            console.log(err);
        }
    }
}

function piwik_pc_track_event_mbg(category, action, json_data) {
    try {
        var obj = Piwik.getAsyncTracker();
        obj.setCustomData(json_data);
        obj.setSiteId(global_monitorid_mbg);
        obj.trackEvent(category, action, 'data', 1);
    } catch (err) {
        if (console) {
            console.log(err);
        }
    }
}

function piwik_pc_track(json_data) {
    try {
        var obj = Piwik.getAsyncTracker();
        obj.setSiteId(global_monitorid);
        obj.setTrackerUrl(global_monitorurl);
        obj.enableLinkTracking();
        obj.setCustomData(json_data);
        obj.trackPageView();
    } catch (err) {
        if (console) {
            console.log(err);
        }
    }
}


function piwik_pc_track_mbg(json_data) {
    try {
        var obj = Piwik.getAsyncTracker();
        obj.setSiteId(global_monitorid_mbg);
        obj.setTrackerUrl(global_monitorurl);
        obj.enableLinkTracking();
        obj.setCustomData(json_data);
        obj.trackPageView();
    } catch (err) {
        if (console) {
            console.log(err);
        }
    }
}
var lenovoid;
if (getCookie(global_loginlenovoid)) {
    lenovoid = getCookie(global_loginlenovoid);
}
if (typeof lenovoid != "undefined") {
    var piwik_data = { "lenovoid": lenovoid }
}
function piwik_callback() {
    var json_data = {};
    if (typeof piwik_data != "undefined") {
        json_data = piwik_data;
    }
    if (typeof page_id != "undefined") {
        json_data["page_id"] = page_id;
    }
    json_data["page_type"] = "pc";
    piwik_pc_track(json_data);
}

function piwik_callback_mbg() {
    var json_data = {};
    if (typeof piwik_data != "undefined") {
        json_data = piwik_data;
    }
    if (typeof page_id != "undefined") {
        json_data["page_id"] = page_id;
    }
    json_data["page_type"] = "pc";
    piwik_pc_track_mbg(json_data);
}
$(function () {
    piwik_loadScript(global_monitorjs, piwik_callback);
});


/******************piwik_new_end*******************/

function addomniture() {
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = "/js/s_code.js";
    oHead.appendChild(oScript);
}

/********判断url跳转是否登录***********/
function IsMemberinfo() {
    if (GetLoginUserName() != null) return false;
    var _lenovoid = $.getUrlParam("lenovoid");
    var _stamp = $.getUrlParam("stamp");
    var _sign = $.getUrlParam("sign");
    var sq = $.getUrlParam("from");
    if (sq == "sq") {
        $.ajax({
            type: "get",
            url: global_ajaxdomain + 'getc2cmemberinfo.do',
            data: { lenovoid: _lenovoid, stamp: _stamp, sign: _sign },
            cache: false,
            async: false,
            dataType: "Json",
            success: function (data) {
                if (data.rc == 0) {
                    addCookie(global_loginusername, data.username, 0);
                    addCookie(global_loginlenovoid, data.lenovoid, 0);
                    addCookie('usertype', data.usertype, 0);
                }
            }
        });
    }
}

/*------------------20150821监控代码------------------*/
var lasid = "lenovoshop_pc";

var laurl = "http://js.lefile.cn/s/la/la_v13.min.js";

var LA_startTime = new Date().getTime();

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
        LA.sid = lasid;
        if (typeof (la_callback) != 'undefined' && la_callback) {
            la_callback();
        }
        else {
            LA.track();
        }
    });
});
