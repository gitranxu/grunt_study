$().ready(function(){

	var oBODY = document.getElementsByTagName('BODY').item(0);

	var obj_unique_jsurl = get_obj_unique_jsurl();

	for(var i in obj_unique_jsurl){

		load_js_by_src(obj_unique_jsurl[i]);
	}
	
	$('.piece .jsurl').each(function(index){

	     

	});

	function load_js_by_src(jsurl){

		var oScript= document.createElement("script"); 

	    oScript.type = "text/javascript"; 

	    oScript.src = jsurl; 

	    oBODY.appendChild( oScript);

	}

	//去重
	function get_obj_unique_jsurl(){

		var result = {};
		
		$('.piece .jsurl').each(function(){

			var jsurl = $(this).text();

			result[jsurl] = jsurl;

		});
		
		return result;
	}

});