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
	new Zhuanpan({nologin_show:win_forlogin_show,nochance_show:win_nochance_show,gongxizhongjiang_show:win_gongxizhongjiang_show,wanshandizhi_show:win_wanshandizhi_show,nozhongjiang_show:win_nozhongjiang_show,zuorichongxian_show:win_zuorichongxian_show});
}

function win_dazhuanpan(){
	$('#closebtn').click(function(){
		$('.win').hide();
	});
}

function win_zuorichongxian_show(msg){
	$('#gongxizhongjiang .msg1').text('').text(msg.msg);
	$('#gongxizhongjiang .msg2').text('').text(msg.prizecode);
	$('#gongxizhongjiang .gxzj').text('').text('您已经中过奖啦！');
	$('#msg3').text('抽奖次数用光了:(');
	$('.win .boxitem,.coin2,.coin3,#phoneno,.fasong').hide();
	$('#gongxizhongjiang,.coin3').show();
	$('.win').show();
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
function win_nochance_show(msg){
	$('#nochance p').text(msg.msg);
	$('.win .boxitem,.coin2,.coin3').hide();
	$('#nochance,.coin2').show();
	$('.win').show();
}
function win_gongxizhongjiang_show(msg,prizecode){
	//msg为中奖信息
	//console.log('-----'+msg);
	$('#gongxizhongjiang .msg1').text('').text(msg);
	$('#gongxizhongjiang .msg2').text('').text(prizecode);
	$('.win .boxitem,.coin2,.coin3').hide();
	$('#gongxizhongjiang,.coin3').show();
	$('.win').show();
}
function win_wanshandizhi_show(){
	$('.win .boxitem,.coin2,.coin3').hide();
	$('#wanshandizhi,.coin3').show();
	$('.win').show();
}
function win_nozhongjiang_show(msg){
	$('#nozhongjiang .msg').text(msg);
	$('.win .boxitem,.coin2,.coin3').hide();
	$('#nozhongjiang').show();
	$('.win').show();
}

/*function hero_dazhuanpan(){
	new ScrollTop({
		$container : $('.heros table')
	}).play();
	
}*/