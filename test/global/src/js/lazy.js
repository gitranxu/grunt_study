
function makeUrl(url, px) {
    var _px = "/" + px;
    var _url = url;
    if (!_url) {
        return _url;
    }
    var myhttp = "http://";
    var a = _url.split(myhttp);
    if(a[0] != myhttp){
        return _url;
    }
    var b = a[1].split("/");
    if (b[0] != "pic.shop.lenovo.com.cn") {
        return _url;
    }
    var c = _url.split(b[0]);
    var d = myhttp + b[0] + _px + c[1];
    //console.log(d);
    return d;
}

function lazyOut(){
	var this_height = parseInt($(window).height());
	var scroll_top = parseInt($(window).scrollTop());
	$("img[class='lazy_img']").each(function(){
		var thisimg_top = parseInt($(this).offset().top - this_height);
		var img_src = $(this).attr("src");
		if(scroll_top > thisimg_top && img_src.indexOf("tempimage.gif") >= 0){
			var this_src = $(this).attr("_src");
			var this_px = $(this).width();
			var src_ = makeUrl(this_src, this_px);
			$(this).attr("src", src_);
		}
	});
}

$(window).scroll(function (event) {
	lazyOut();
});

$(window).resize(function(){
    lazyOut();
});

$(function () {
	lazyOut();
});
