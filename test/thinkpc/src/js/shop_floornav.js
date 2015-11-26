$(function(){

	//调用之前先动态生成li相关信息
	//piece中想成为锚点的元素大概长这样子：<div id="a" class="maodian" _title="电脑" style="height:700px;background:yellow;"></div>
	$("#shop_floornav").hide();
	$(window).scroll(function(){
		var s = $("#shop_floornav").parents('.piece_cntr').position().top;
		var st = $('.maodian:eq(0)').position().top;
		if(s > st){
			$("#shop_floornav").show();
		}else{
			$("#shop_floornav").hide();
		}
	});
	
    $("#shop_floornav").delegate('a','click',function(){
    	var scrolltodom = $(this).attr("data-scroll");
        $('html,body').animate({
            scrollTop:$(scrolltodom).offset().top},500
        );
    });

	var $shop_floornav = $('#shop_floornav');
	$shop_floornav.empty();
	$('.maodian').each(function(index){//maodian_id_
		//var id = $(this).attr('id');
		var fid = $(this).parents('.piece_cntr').attr('fid');
		var id = 'maodian_id_' + fid;
		$(this).attr('id',id);
		var _title = $(this).attr('_title');
		
		$shop_floornav.append('<a href="#'+id+'" data-scroll="#'+id+'" title="'+_title+'">'+(index-0+1)+'F</a>');
	});

    // 右侧浮动栏
    //Shop.floornav();
});