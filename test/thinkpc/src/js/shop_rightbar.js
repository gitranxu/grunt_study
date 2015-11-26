/**
 * Think商城首页右侧浮动栏js
 * @author 付润鑫
 * @date 2015-10-17
 **/

$(function() {
	scroll();
	$('.shop_pointer').hover(function() {
		$(this).addClass('active').find('.V_jt,.V_icon_cont').show();
	}, function() {
		$(this).removeClass('active').find('.V_jt,.V_icon_cont').hide();
	});

	$('#shop_totop').click(function() {
		$('html,body').animate({
			scrollTop : 0
		}, 500);
	});

	$(window).scroll(function() {
		scroll();
	});

});

function scroll(){
    var scrollTop=$(window).scrollTop();
    var winHeight=$(window).height();
    if(scrollTop<74){
        $('#shop_rightbar').css({
            'height':(winHeight-(74-scrollTop))+'px',
            'top':(74-scrollTop)+'px'
        });
    }else{
        $('#shop_rightbar').css({
            'height':winHeight+'px',
            'top':'0px'
        });
    }
}