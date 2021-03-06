/**
 * Think商城首页轮播图js
 * @author 付润鑫
 * @date 2015-10-17
 **/

$(function() {
	var banner_img = $(".banner_img");
	var banner_li = $(".banner_img").find("li");
	var banner_bt = $(".banner_bt");
	var banner_length = banner_li.length;
	//parseInt($("#TitleLoopTime").html() + '000');//循环播放间隔
	var timer = 5000; 
	var ban = 0;
	banner_li.eq(ban).show();
	
	banner_bt.empty();
	for ( var i = 0; i < banner_length; i++) {
		banner_bt.append($("<a></a>"));

	}
	banner_bt.find("a").eq(ban).addClass("now");
	banner_img.hover(function() {
		clearInterval(play);
	}, function() {
		play = setInterval(banner_next, timer);
	});
	$(".banner_prev").click(banner_prev);
	$(".banner_next").click(banner_next);

	function banner_prev() {
		ban--;
		if (ban < 0) {
			ban = banner_length - 1;
		}
		banner_li.fadeOut(500);
		banner_bt.find("a").removeClass("now");
		banner_bt.find("a").eq(ban).addClass("now");
		banner_li.eq(ban).fadeIn(500);
	}
	function banner_next() {
		ban++;
		banner_li.fadeOut(500);
		if (ban == banner_length) {
			ban = 0;
		}
		banner_bt.find("a").removeClass("now");
		banner_bt.find("a").eq(ban).addClass("now");
		banner_li.eq(ban).fadeIn(500);
	}
	$(".banner_bt a").hover(function() {
		var banner_bt_index = $(this).index();
		clearInterval(play);
		banner_bt.find("a").removeClass("now");
		banner_bt.find("a").eq(banner_bt_index).addClass("now");
		banner_li.fadeOut(0);
		banner_li.eq(banner_bt_index).fadeIn(0);
		play = setInterval(banner_next, timer);
	});
	var play = setInterval(banner_next, timer);
	$("#think_banner").hover(function() {
		$(".banner_prev").stop().fadeIn(0);
		$(".banner_next").fadeIn(0);
	}, function() {
		$(".banner_prev").stop().fadeOut(0);
		$(".banner_next").stop().fadeOut(0);
	});
});