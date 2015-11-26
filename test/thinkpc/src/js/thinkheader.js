/**
 * 商城头部公共js
 * @author 付润鑫
 * @date 2015-10-19
 */

var navpadding = {
	logined : function() {
		var loginWidth = $('.think_user').width() + 36;
		var navLi = $('.think_nav .navpad');
		var searchInput = $('.think_search input');
		//动画的开关变量
		var open = 0;
		navLi.css('padding-right', '70px');
		searchInput.unbind('focus').focus(function(event) {
			if (open == 0) {
				navLi.css('padding-right', '55px');
				$(this).stop(true, true).animate({
					width : '220px'
				}).parent('.think_search').stop(true, true).animate({
					width : '260px'
				});
				open = 1;
			} else {
				$(this).blur();
				event.stopPropagation();
			}

		})
		searchInput.unbind('blur').blur(function(event) {
			if (open == 1) {
				$(this).stop(true, true).animate({
					width : '160px'
				}).parent('.think_search').stop(true, true).animate({
					width : '200px'
				}, function() {
					navLi.css('padding-right', '70px');
					open = 0;
				})
				event.stopPropagation();
			} else {
				$(this).focus();
			}
		})
	},
	unlogin : function() {
        var loginWidth = $('.think_user').width() + 36;
        var navLi = $('.think_nav .navpad');
        var searchInput = $('.think_search input');
        //动画的开关变量
        var open = 0;
        searchInput.focus(function(event) {
            if (open == 0) {
                navLi.css('padding-right', '85px');
                $(this).animate({
                    width : '220px'
                }).parent('.think_search').animate({
                    width : '260px'
                });
                open = 1;
            } else {
                $(this).blur();
                event.stopPropagation();
            }
        })
        searchInput.blur(function(event) {
            if (open == 1) {
                var input = $(this),parent = $(this).parent();

                window.setTimeout(function(){
                    $(input).animate({
                        width:'200px'
                    },function(){
                        navLi.css('padding-right', '100px');
                        open = 0;
                    })

                    $(parent).animate({
                        width:'200px'
                    })
                },500)
                event.stopPropagation();
            } else {
                $(this).focus();
            }
        })
	}
}





//update navborder
function navborder(con) {
	con = typeof con === 'number' ? con : 400;
	var navLi = $('.think_navul>li'), navBor = $('.think_nav_border')
	navLi.hover(function() {

		navBor.stop().animate({
			left : $(this).offsetParent().context.offsetLeft,
			width : $(this).find('a').width()
		}, con);
	}, function() {
		navBor.stop().animate({
			left : 0,
			width : 0
		}, con);
	});
}

//根据购物车数量动态显示头部图标
$(function(){
	//islogin
	if (window.passport && passport.isLogin()) {
		$(".ellipsis").html(passport.cookie.loginName);
		$(".think_login").hide();
		$(".think_register").show();
		//navpadding.logined();
	} else
		//navpadding.unlogin();
	
	navborder(300);
	
	var url=$GRUNTCONFIG.DEV.cartNumurl;
	$.ajax({
		url:url,
		dataType:'jsonp',
		async: false, 
		type:'get',
		jsonp: "callbackparam",
		success:function(data){
			if(data.count==0){
				$(".think_car i").removeClass("usepng");
			}else{
				$(".think_car i").addClass("usepng");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(XMLHttpRequest.status);
			console.error(XMLHttpRequest.readyState);
			console.error(textStatus);
		}
	});

    new AutoComplete({
        input:$(".think_search input[type=text]"),
        suggest:$("#suggestContainer"),
        tip:"ThinkPad X1",
        getDatas:function(){
            var that = this;

            this.oldVal = $(".think_search input[type=text]").val();
            var _val = $(".think_search input[type=text]").val()
            $.ajax({
                url:$GRUNTCONFIG.DEV.thinkSearchUrl+"/search/suggest?kw="+$(".think_search input[type=text]").val(),
                success:function(d){
                    var _data = [];

                    _data.push("<ul><li><a href='"+$GRUNTCONFIG.DEV.thinkSearchUrl+"?key="+_val+"'>"+ _val+"</a></li>");
                    if(d == "" || d.s.length==0){
                        if(_val != ""){
                            _data.push("</ul>");
                            that.suggest.html(_data.join('')).show();
                        }
                        else{
                            that.suggest.html("").hide();
                        }
                        return;
                    }else{
                        for(var i =0;i< d.s.length;i++){
                            _data.push("<li><a href='"+$GRUNTCONFIG.DEV.thinkSearchUrl+"?key="+d.s[i]+"'>"+ d.s[i]+"</a></li>");
                        }
                        _data.push("</ul>");
                        that.suggest.html(_data.join('')).show();
                    }
                }
            })
        },
        submit:function(){
            this.suggest.hide();
            window.location.href = $GRUNTCONFIG.DEV.thinkSearchUrl+"?key="+ encodeURIComponent($(".think_search input[type=text]").val());
        }
    })

    $("body").delegate(".think_search .usepng","click",function(){
        window.location.href = $GRUNTCONFIG.DEV.thinkSearchUrl+"?key="+ encodeURIComponent($(this).prev().val());
    })
});


