window.onload = function(){//必须要等图片加载完后，才能开始抽奖
	//alert(1);
	bind_dazhuanpan();
	//hero_dazhuanpan();//英雄榜

}

function bind_dazhuanpan(){
	//zhuanpan_dazhuanpan();
	zhuanpan_dazhuanpan();
	win_dazhuanpan();//弹窗相关的事件
}

function zhuanpan_dazhuanpan(){
	//passport.isLogin()
	new Zhuanpan({nologin_show:win_forlogin_show,nochance_show:win_nochance_show,gongxizhongjiang_show:win_gongxizhongjiang_show,wanshandizhi_show:win_wanshandizhi_show});
}

function win_dazhuanpan(){
	$('#closebtn').click(function(){
		$('.win').hide();
	});
}

function win_forlogin_show(){
	$('.win .boxitem,.coin2,.coin3').hide();
	$('#forlogin,.coin2').show();
	$('.win').show();
}
function win_loginsuccess_show(){
	$('.win .boxitem,.coin2,.coin3').hide();
	$('#loginsuccess,.coin2').show();
	$('.win').show();
}
function win_nochance_show(){
	$('.win .boxitem,.coin2,.coin3').hide();
	$('#nochance,.coin2').show();
	$('.win').show();
}
function win_gongxizhongjiang_show(msg){
	//msg为中奖信息
	$('#gongxizhongjiang span').text(msg);
	$('.win .boxitem,.coin2,.coin3').hide();
	$('#gongxizhongjiang,.coin3').show();
	$('.win').show();
}
function win_wanshandizhi_show(){
	$('.win .boxitem,.coin2,.coin3').hide();
	$('#wanshandizhi,.coin3').show();
	$('.win').show();
}

function hero_dazhuanpan(){
	new ScrollTop({
		$container : $('.heros table')
	}).play();
	
}