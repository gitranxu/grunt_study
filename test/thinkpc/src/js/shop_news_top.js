/**
 * Think商城首页商城快报js
 * @author 付润鑫
 * @date 2015-10-17
 **/
$(function() {
	function AutoScroll(obj) {
		$(obj).find("ul:first").animate({
			marginTop : "-26px"
		}, 500, function() {
			$(this).css({
				marginTop : "0px"
			}).find("li:first").appendTo(this);
		});
	}

	var timerNews = null;
	timerNews = setInterval(function() {
		AutoScroll('#shop_news');
	}, 2000);

	$('#shop_news').hover(function() {
		clearInterval(timerNews);
	}, function() {
		timerNews = setInterval(function() {
			AutoScroll('#shop_news');
		}, 2000);
	});
});