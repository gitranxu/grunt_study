/**
 * @author zhengfy1
 * thinkpcimagespath:thinkpc图片路径
 * lenovoshopurl:联想商城地址
 * thinkpcdomainurl:thinkpc商城地址
 * thinkpcCarturl:thinkpc购物车地址
 * ssourl:单点登录跳转登录地址
 * cartNumurl:获取购物车数量接口地址
 */



var $GRUNTCONFIG = {
    "DEV":{
        thinkpcimagespath:"http://m1.lenovodev.cn/tp/images", 
        lenovoshopurl:"http://www.lenovodev.com",       
        thinkpcdomainurl:"http://www.think.com",
        thinkpcCarturl:"",
        ssourl:"http://reg.lenovo.com.cn/auth/v1/login",
        cartNumurl:"http://cart.vip.lenovouat.cn/getshoppingcartcount.jhtml",
        thinkSearchUrl:"http://s.tks.lenovouat.cn",
        thinkproductdm:"http://products.thinkworld.com.cn"
    },
    "UAT":{
        thinkpcimagespath:"http://m1.lenovouat.cn/tp/images",
        lenovoshopurl:"http://www.lenovouat.com",
        thinkpcdomainurl:"http://www.tks.lenovouat.cn",
        thinkpcCarturl:"http://cart.think.lenovouat.cn/",
        ssourl:"http://reg.lenovouat.com.cn/auth/v1/login",
        cartNumurl:"http://cart.think.lenovouat.cn/getshoppingcartcount.jhtml",
        thinkSearchUrl:"http://s.tks.lenovouat.cn",
        thinkproductdm:"http://products.thinkworld.com.cn"
    },
    "PRODUCTION":{
        thinkpcimagespath:"http://m1.lefile.cn/tp/images",
        lenovoshopurl:"http://www.lenovo.com.cn",
        thinkpcdomainurl:"http://www.thinkworldshop.com.cn",
        thinkpcCarturl:"http://cart.thinkworldshop.com.cn",
        ssourl:"https://reg.lenovo.com.cn/auth/v1/login",
        cartNumurl:"http://cart.thinkworldshop.com.cn/getshoppingcartcount.jhtml",
        thinkSearchUrl:"http://s.thinkworldshop.com.cn",
        thinkproductdm:"http://products.thinkworld.com.cn"
    }
}