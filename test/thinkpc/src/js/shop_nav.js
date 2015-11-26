/**
 * Think商城首页分类导航js
 * @author 付润鑫
 * @date 2015-10-17
 **/

$(function(){
    var navItem=$('.shop_nav_item');
    var childItem=$('.nav_child_item');
    navItem.hover(function(){
        $(this).find('.shop_nav_link').addClass('active').siblings('.shop_nav_child').show();

        var child=$(this).find('.shop_nav_child');
        var childH=child.height();

        if(childH<=300){
            child.css('height','300px');
        }else{
            child.css('height',childH+'px');
        }

    },function(){
        $(this).find('.shop_nav_link').removeClass('active').siblings('.shop_nav_child').hide();
    });

    childItem.hover(function(){
        $(this).find('.nav_child_link').addClass('active').siblings('.shop_nav_children').show();

        var children=$(this).find('.shop_nav_children');
        var childredH=children.height();

        if(childredH<=300){
            children.css('height','300px');
        }else{
            children.css('height',childredH+'px');
        }

    },function(){
        $(this).find('.nav_child_link').removeClass('active').siblings('.shop_nav_children').hide();
    });	
});