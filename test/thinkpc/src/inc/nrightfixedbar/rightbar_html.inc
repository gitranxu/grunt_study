<div class="piece atp123123123163">
	<style>
		.atp123123123163 .shopicon{display: inline-block;background-image: url($GRUNTCONFIG.DEV.thinkpcimagespath/shopicon.png);background-repeat: no-repeat;}
		<!-- 右侧浮动栏 -->
		.atp123123123163 .shop_rightbar{position: fixed;right: 0;top: 0;z-index: 999;height: 100%;width: 45px;}
		.atp123123123163 .shop_rightbar_con{width: 45px;height: 100%;background: #37383b;}
		.atp123123123163 .shop_rightbar_con li{width: 45px;height: 56px;}
		.atp123123123163 .shop_rightbar_con .shop_pointer{position: absolute;bottom: 56px;left: 0;}
		.atp123123123163 .shop_rightbar_con .shop_totop{position: absolute;bottom: 0;left: 0;}
		.atp123123123163 .shop_rightbar_con .shop_userlogo,.shop_rightbar .shop_userlogo img{width: 45px;height: 45px;}
		.atp123123123163 .shop_rightbar_con li .shopicon{text-indent: -9999px;display: block;width: 45px;height: 56px;}
		.atp123123123163 .shop_rightbar_con .active .shopicon{background-color: #e72e25;color: #fff;}
		.atp123123123163 .shop_rightbar_con .shop_car .shopicon{text-indent: 0px;color: #e72e25;background-position: -113px -16px;line-height: 80px;text-align: center;}
		.atp123123123163 .shop_rightbar_con .shop_car .shopicon:hover{background-position: -67px -16px;background-color: #e72e25;color: #fff;}
		.atp123123123163 .shop_rightbar_con .shop_save .shopicon{background-position: -113px -72px;}
		.atp123123123163 .shop_rightbar_con .shop_save .shopicon:hover{background-position: -66px -72px;background-color: #e72e25;}
		.atp123123123163 .shop_rightbar_con .shop_pointer .shopicon{background-position: -204px -9px;}
		.atp123123123163 .shop_rightbar_con .active .shopicon{background-position: -158px -8px;}
		.atp123123123163 .shop_rightbar_con .shop_totop .shopicon{background-position: -205px -71px;}
		.atp123123123163 .shop_rightbar_con .shop_totop .shopicon:hover{background-position: -158px -70px;background-color: #e72e25;}

		.atp123123123163 .shop_rightbar_con .shop_pointer .V_jt {display: block;background-position: -102px -177px;width: 7px;height: 16px;overflow: hidden;position: absolute;left: -1px;top: 18px;z-index: 1000;display: none;}
		.atp123123123163 .shop_rightbar_con .shop_pointer .V_icon_cont{border: 1px solid #d6d6d6;background: #FFF;position: absolute;width: 171px;left: -173px;bottom: -56px;z-index: 1;display: none;}
		.atp123123123163 .shop_rightbar_con .shop_pointer .V_user_infor {padding: 0px;}
		.atp123123123163 .shop_rightbar_con .shop_pointer .V_user_infor dd {line-height: 36px;border-bottom: 1px solid #efefef;margin: 0px;text-align: center;margin: 0px 20px;color: #4f4f4f;}
		.atp123123123163 .shop_rightbar_con .shop_pointer .V_user_infor dd.V_kf_tel {line-height: 20px;margin: 0px;padding: 2px 0px;}
		.atp123123123163 .shop_rightbar_con .shop_pointer .V_kf_tel span {display: block;margin: 0px auto;font-size: 14px;}
		.atp123123123163 .shop_rightbar_con .shop_pointer dd a{color: #4f4f4f;}
		.atp123123123163 .shop_rightbar_con .shop_pointer dd a:hover{color: #e72e25;}
	</style>
	<div class="shop_rightbar" id="shop_rightbar" style="position: fixed;right: 0;top: 0;z-index: 999;height: 100%;width: 45px;">
		<div class="shop_rightbar_con">
		    <ul>
		        <li class="shop_userlogo">
		            <a href="javascript:isLogin();" target="_blank" title="会员中心"><img src="$GRUNTCONFIG.DEV.thinkpcimagespath/userlogo.jpg" alt="会员中心" /></a>
		        </li>
		        <li class="shop_car">
		            <a href="$GRUNTCONFIG.DEV.thinkpcCarturl" target="_blank" title="购物车" class="shopicon">购物车</a>
		        </li>
		        <li class="shop_save">
		            <a href="$GRUNTCONFIG.DEV.thinkpcdomainurl/user/attention.html" target="_blank" title="我的收藏" class="shopicon">我的收藏</a>
		        </li>
		        <li class="shop_pointer">
		            <a href="javascript:;" class="shopicon"></a>
		            <i class="shopicon V_jt"></i>
		            <div class="V_icon_cont">
		                <dl class="V_user_infor">
		                    <dd>
		                        <a href="http://srv.shop.lenovo.com.cn/home/client?s=0&q=group9&v=1" target="_blank" id="shop_online_talk">商城在线咨询</a>
		                    </dd>
		                    <dd>
		                        <a target="_blank" href="http://robot.lenovo.com.cn/lenovo/?channel=thinkworld">产品售后咨询</a>
		                    </dd>
		                    <dd class="noborder_btm">
		                        <a href="javascript:iframeBox('意见反馈','750','300','$GRUNTCONFIG.DEV.thinkpcdomainurl/user/feedback.html');" id="fd_right_btn">意见反馈</a>
		                    </dd>
		                    <dd class="V_kf_tel">
		                        商城客服电话<span>400 898 9006</span>
		                    </dd>
		                    <dd class="V_kf_tel">
		                        工作时间<span>周一~周日，8:30~17:30</span>
		                    </dd>
		                </dl>
		            </div>
		        </li>
		        <li class="shop_totop" id="shop_totop">
		            <a href="javascript:;" title="回到顶部" class="shopicon">回到顶部</a>
		        </li>
		    </ul>
		</div>
	</div>
</div>