//模版后台引用js,不要参与合并,后台单独引用
(function(window,$,undefined){
	window.backObject = window.backObject || {};
	var lenovoBack = {
		setting : {
			piece_cntr : 'piece_cntr', 
			floor_cntr : 'floor_cntr',
			choseBtn : 'choseBtn',
			btn_group : 'btn_group',
			btn_cntr_in_piece : 'btn_cntr_in_piece',
			$current_piece_cntr : null, 
			colorArr : [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'],
			mode : 2,
			well_colors : ['#9E92D9','#37D37A','#9EDA91','#BBE963','#7EC20C','#A59D92','#5141AB','#1660C6','#4BD93D','#E54935','#971D0E','#805E47','#6AAEA2','#C4C545','#D87983','#9588B9','#C26CB7','#7B4059','#6D8E4E','#5CAA22','#E45900','#9D90D4','#E9B5AE','#884D33','#6EAC6E','#B8C520','#C781B8','#7C5CEC','#7031C0','#8C7D9D'],
			colormode : 1,
			createfloor_url : '/floor/createfloor',//该接口返回floorid
			findpieces_url : '/template/getTemplateList',//查询碎片//?t_type=&t_width=10
			floor_map_piece_url : '/floor/updfloor',//,?id=楼层id&tid=模版id
			//http://template.lenovo.com.cn/data/page?type=2&floorId=676a857c-89c2-4322-9c4e-f5fb177d5d0c&sort=0
			to_edit_data_page_url : '/data/page',
			del_piece_cntr_url : '/floor/delfloor',//删除楼层
			updfloorSort_url : '/floor/updfloorSort',//增加楼层
			floorConfig_url : '/floor/setConfig'

		},
		html : {
			getBtn1 : function(){
				return '<div class="choseBtn"><div class="bg"></div><div class="btn_ctn btn1">选择碎片</div></div>';
			},
			getBtn2 : function(){
				return '<div class="choseBtn"><div class="bg"></div><div class="btn_ctn btn2">向下增加楼层</div></div>';
			},
			getBtn3 : function(){
				return '<div class="choseBtn"><div class="bg"></div><div class="btn_ctn btn3">删除楼层</div></div>';
			},
			getBtn4 : function(){
				return '<div class="choseBtn"><div class="bg"></div><div class="btn_ctn btn4">向上增加楼层</div></div>';
			},
			getBtn5 : function(){
				return '<div class="choseBtn"><div class="bg"></div><div class="btn_ctn btn5">向上移动</div></div>';
			},
			getBtn6 : function(){
				return '<div class="choseBtn"><div class="bg"></div><div class="btn_ctn btn6">向下移动</div></div>';
			},
			getBtn7 : function(){
				return '<div class="choseBtn"><div class="bg"></div><div class="btn_ctn btn7">楼层配置</div></div>';
			},
			//包含所有按钮的组合
			getAllBtns : function($piece_cntr){
				var $piece_cntrs = $piece_cntr.parents('.'+lenovoBack.setting.floor_cntr).find('.'+lenovoBack.setting.piece_cntr);
				var index = $piece_cntrs.index($piece_cntr);
				var piece_cntr_length = $piece_cntrs.length;

				var up_move_btn = this.getBtn5();
				var down_move_btn = this.getBtn6();
				var up_create_btn = this.getBtn4();
				var down_create_btn = this.getBtn2();
				var config_btn = this.getBtn7();//得到配置按钮

				if(index==0){
					up_move_btn = '';
					up_create_btn = '';
				}
				if(index==piece_cntr_length-1){
					down_move_btn = '';
				}
				if($piece_cntr.hasClass('fixed')){
					up_move_btn = '';//固定的话就没有上下移动按钮了
					down_move_btn = '';
				}

				
				if($piece_cntr.hasClass('along')){
					up_create_btn = '';
					down_create_btn = '';
				}

				var remove_btn = this.getBtn3();
				if($piece_cntr.hasClass('noremove')){
					remove_btn = '';
				}

				var chose_btn = this.getBtn1();
				if($piece_cntr.hasClass('nochose')){
					chose_btn = '';
				}

				//return '<div class="'+lenovoBack.setting.btn_group+'">'+ chose_btn + up_create_btn + down_create_btn + up_move_btn + down_move_btn + remove_btn +'</div>';
				return '<div class="'+lenovoBack.setting.btn_group+'">'+ remove_btn + down_move_btn + up_move_btn + down_create_btn + up_create_btn + chose_btn + config_btn +'</div>';
			},
			getFloor : function(){
				var randColor = lenovoBack.fn.getRandColor();
				return '<div class="'+lenovoBack.setting.piece_cntr+' back_height" style="background:'+randColor+'"></div>';
			},
			getGenerateHTMLBtn : function(){
				return '<div class="choseBtn" id="generate_html_btn">'+
							'<div class="bg"></div>'+
							'<div class="btn_ctn btn9">生成静态页面</div>'+
						'</div>';
			},
			getPrevViewHTMLBtn : function(){
				return '<div class="choseBtn" id="prev_view_btn">'+
							'<div class="bg"></div>'+
							'<div class="btn_ctn btn10">预览</div>'+
						'</div>';
			},
			getChosePiecesWin : function(){
				var lis = '';
				if(lenovoBack.setting.mode==0||lenovoBack.setting.mode==1){
					lis = '<li class="border_top_none" imgurl="./img/test1.png" piece_data_url="delay_repair_1_1200"><div class="bgli"></div><div class="ctnli">宽1200碎片1<span class="isupdate">有更新</span></div></li>'+
						'<li class="border_top_none" imgurl="./img/test2.png" piece_data_url="solve_question_1_1200"><div class="bgli"></div><div class="ctnli">宽1200碎片2</div></li>'+
						'<li class="border_top_none" imgurl="./img/test2.png" piece_data_url="all_buy_1_1200"><div class="bgli"></div><div class="ctnli">宽1200碎片3</div></li>'+
						'<li class="border_top_none" imgurl="./img/test2.png" piece_data_url="disk_up_1_1200"><div class="bgli"></div><div class="ctnli">宽1200碎片4</div></li>'+
						'<li class="border_top_none" imgurl="./img/test3.png" piece_data_url="category_menu_1_280"><div class="bgli"></div><div class="ctnli">宽280碎片1</div></li>'+
						'<li class="border_top_none" imgurl="./img/test4.png" piece_data_url="nav_top_1_920"><div class="bgli"></div><div class="ctnli">宽920碎片1</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="slider_1_920"><div class="bgli"></div><div class="ctnli">宽920碎片2</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="slider_2_920"><div class="bgli"></div><div class="ctnli">宽920碎片test</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="slider_3_920"><div class="bgli"></div><div class="ctnli">宽920碎片3</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="shop_floornav_24"><div class="bgli"></div><div class="ctnli">左侧浮动条</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="shop_rightbar_45"><div class="bgli"></div><div class="ctnli">右侧浮动条</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="shop_hot_1200"><div class="bgli"></div><div class="ctnli">宽1200碎片商品热卖</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="shop_computer_1200"><div class="bgli"></div><div class="ctnli">thinkPad笔记本_1200</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="shop_mainhot_1200"><div class="bgli"></div><div class="ctnli">banner下热销产品_1200</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="shop_nav_207"><div class="bgli"></div><div class="ctnli">shop_nav_207</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="shop_banner_713"><div class="bgli"></div><div class="ctnli">shop_banner_713</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="shop_news_top_280"><div class="bgli"></div><div class="ctnli">shop_news_top_280</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="shop_news_down_280"><div class="bgli"></div><div class="ctnli">shop_news_down_280</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="shop_advertise_1200"><div class="bgli"></div><div class="ctnli">shop_advertise_1200</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="shop-g_fivelayout_1200"><div class="bgli"></div><div class="ctnli">shop-g_fivelayout_1200</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="shop-g_banner_1200"><div class="bgli"></div><div class="ctnli">shop-g_banner_1200</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="think_footer2_max"><div class="bgli"></div><div class="ctnli">think_footer2_max</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="think_footer1_max"><div class="bgli"></div><div class="ctnli">think_footer1_max</div></li>'+
						'<li class="border_top_none" imgurl="./img/test5.png" piece_data_url="think_header_max"><div class="bgli"></div><div class="ctnli">think_header_max</div></li>';
				}
				return '<div id="chose_pieces_cntr" class="hid">'+
							'<div class="bg3"></div>'+
							'<div id="chose_pieces_win">'+
								'<div class="bg2"></div>'+
								'<div class="content">'+
									'<div class="c_left">'+
										'<h3 class="c_title">可选的碎片有：</h3>'+
										'<ul class="piece_ul">'+
											lis+
										'</ul>'+
									'</div>'+
									'<div class="c_right">'+
										'<h3 class="c_title">效果预览：</h3>'+
										'<div class="prev_view">'+
											'<img src="" alt="暂无图片效果">'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>';
			},
			get_btn_wrap_in_piece : function(){
				return '<div class="btn_wrap_in_piece">'+
	                        '<div class="btn_bg_in_piece"></div>'+
	                        '<div class="btn_in_piece">编辑<div class="btn_in_piece1 t">限制</div><div class="btn_in_piece1 k">宽:<span>100</span></div><div class="btn_in_piece1 g">高:<span>100</span></div></div>'+
	                    '</div>';
			},
			msg_to_findpieces_html : function(msg){
				var tpl = document.getElementById('query_pieces_tpl').innerHTML;
				var html = juicer(tpl,msg);
				return html;
			}
		},
		juicer : {
			msg_to_findpieces : function(){
				return '<li class="border_top_none" imgurl="" piece_id=""><div class="bgli"></div><div class="ctnli">abc</div></li>';
			}
		},
		fn : {
			//在上面增加一个楼层
			add_floor_before : function(floorHTML,$piece_cntr){
				$piece_cntr.before(floorHTML);
				var $newfloor_piece = $piece_cntr.prev();
				lenovoBack.run.piece_after_add($piece_cntr,$newfloor_piece,'before');
			},
			//在下面增加一个楼层
			add_floor_after : function(floorHTML,$piece_cntr){
				$piece_cntr.after(floorHTML);
				var $newfloor_piece = $piece_cntr.next();
				lenovoBack.run.piece_after_add($piece_cntr,$newfloor_piece,'after');
			},
			getRandColor : function(){
				if(lenovoBack.setting.colormode==2){
					return this.getRandColor2();
				}
				var color = '#';
				for(var i = 0;i < 6;i++){
					color += lenovoBack.setting.colorArr[this.getRandomByArr(lenovoBack.setting.colorArr)];
				}
				return color;
			},
			getRandColor2 : function(){
				return lenovoBack.setting.well_colors[this.getRandomByArr(lenovoBack.setting.well_colors)];
			},
			getRandomByArr : function(arr){//parseInt(Math.random()*(y-1))+x,x到y之间的随机数
				return parseInt(Math.random()*(arr.length-1));
			},
			/*
				加入新的楼层后要进行排序
			*/
			add_order_num : function($cur_piece_cntr,$newfloor_piece,direct,$src_piece_cntr){
				var cur_ordnum = $cur_piece_cntr.attr('ordnum');
				var $next_piect_cntr = null;
				var add_num = 1;
				if(direct=='after'){
					$next_piect_cntr = $newfloor_piece.next('.'+lenovoBack.setting.piece_cntr);
				}else{
					$next_piect_cntr = $newfloor_piece.prev('.'+lenovoBack.setting.piece_cntr);
					add_num = -1;
				}
				
				$newfloor_piece.attr('ordnum',cur_ordnum-0+add_num);
				if($next_piect_cntr.length){
					var new_ordnum = $newfloor_piece.attr('ordnum');
					var next_ordnum = $next_piect_cntr.attr('ordnum');
					if(new_ordnum==next_ordnum){
						lenovoBack.fn.add_order_num($newfloor_piece,$next_piect_cntr,direct,$src_piece_cntr);
					}else{
						console.log('这里应该只有小于或等于两种情况');
					}
				}else{
					//console.log('方法执行完毕....');
					//这里按块将块里所有的楼层的序号进行保存
					//1.调用楼层增加接口，楼层增加接口成功或上下移动成功后调用saveorder接口
					//lenovoBack.ajax.ajax_com();
					//var $floor_cntr = $newfloor_piece.parents('.'+lenovoBack.setting.floor_cntr);
					//lenovoBack.ajax.saveorder($floor_cntr);
					lenovoBack.ajax.create_floor(function(msg){
						if(msg.retCode==0){//成功
							$src_piece_cntr.attr('fid',msg.data);

							var $floor_cntr = $src_piece_cntr.parents('.'+lenovoBack.setting.floor_cntr);
							lenovoBack.ajax.saveorder($floor_cntr);
						}else{
							console.log('创建楼层失败......');
						}
					},$src_piece_cntr);
				}
			},
			remove_all_btns : function($piece_cntr){
				$piece_cntr.find('.'+lenovoBack.setting.btn_group).remove();
			},
			piece_cntr_after_change : function($piece_cntr_a,$piece_cntr_b){
				if($piece_cntr_a){
					lenovoBack.fn.remove_all_btns($piece_cntr_a);
					$piece_cntr_a.append(lenovoBack.html.getAllBtns($piece_cntr_a));
				}
				if($piece_cntr_b){
					lenovoBack.fn.remove_all_btns($piece_cntr_b);
					$piece_cntr_b.append(lenovoBack.html.getAllBtns($piece_cntr_b));
				}
			},
			after_floor_remove : function($the_piece_cntr_to_remove){
				var $prev_piece_cntr = $the_piece_cntr_to_remove.prev('.'+lenovoBack.setting.piece_cntr);
				var $next_piece_cntr = $the_piece_cntr_to_remove.next('.'+lenovoBack.setting.piece_cntr);
				$the_piece_cntr_to_remove.remove();//这句话应该是上面的接口执行成功后执行
				lenovoBack.fn.piece_cntr_after_change($prev_piece_cntr,$next_piece_cntr);
			},
			//当楼层移动完后的动作1.重新判断按钮，2.将ordnum信息保存进数据库
			piece_cntr_move : function($current_piece_cntr,$target_piece_cntr,direct){
				//先移动，后再发请求保存最新的顺序号
				if(direct=='after'){
					$current_piece_cntr.after($target_piece_cntr);
				}else{
					$current_piece_cntr.before($target_piece_cntr);
				}
				var $floor_cntr = $current_piece_cntr.parents('.'+lenovoBack.setting.floor_cntr);
				this.reorder_floor($floor_cntr);//重新排序
				
				lenovoBack.ajax.saveorder($floor_cntr,function(){
					
					lenovoBack.fn.piece_cntr_after_change($current_piece_cntr,$target_piece_cntr);
				});
			},
			reorder_floor : function($floor_cntr){
				var a_sort = [];
				$floor_cntr.find('.'+lenovoBack.setting.piece_cntr).each(function(){
					a_sort.push($(this).attr('ordnum'));
				});
				a_sort.sort(function(a,b){return a-b;});
				
				$floor_cntr.find('.'+lenovoBack.setting.piece_cntr).each(function(index){
					$this = $(this);
					$this.attr('ordnum',a_sort[index]);
				});
			},
			//后台查询初始化接口，可能涉及到back_height类的操作(如果有操作楼层，顺便就把该楼层的back_height去掉了)，同时，如果是模式2的话，才会请求
			/*page_init : function(){
				//首先得到当前页面的块id，然后根据id去得到相应的数据
				var floor_cntr_ids = this.get_floor_cntr_ids();
				//console.log(floor_cntr_ids+'-----------');
			},
			//返回当前页面的块ids,多个的话以逗号分隔
			get_floor_cntr_ids : function(){
				var result = '';
				var $floor_cntrs = $('.back').find('.'+lenovoBack.setting.floor_cntr);
				for(var i = 0,j = $floor_cntrs.length; i < j ;i++){
					result += $floor_cntrs.eq(i).attr('bid')+',';
				}
				return result.substring(0,result.length-1);
			},*/
			//有piece类则无back_height
			has_piece : function(){
				$('.back').find('.'+lenovoBack.setting.piece_cntr).each(function(){
					var $this = $(this);
					if($this.find('.piece').length){
						lenovoBack.fn.rm_back_show_style($this);
					};
					lenovoBack.fn.parse_btn_in_piece($this);
				});
			},
			//去掉一个楼层的用于后台展示的所有的宽高类同时将背景色去掉
			rm_back_show_style : function($piece_cntr){
				$piece_cntr.removeAttr('style');//去掉背景色
				$piece_cntr.removeClass('back_h50 back_h100 back_h200 back_h300 back_h500 back_w50 back_w100 back_w200 back_w300 back_t50 back_height');
			},
			win_reload : function(msg){
				console.log('reload.......'+msg);
				window.location.reload();
			},
			//根据块去得到该块下面的所有的楼层id及对应的ordnum(这里统一将ordnum按从小到大顺序排序)
			id_map_ordnum : function($floor_cntr){
				var result = '';
				$floor_cntr.find('.'+lenovoBack.setting.piece_cntr).each(function(index){
					$this = $(this);
					result += $this.attr('fid')+'_'+$this.attr('ordnum')+';'
				});
				console.log(result+'--------------------result');
				return result;
			},
			parse_btn_in_piece : function($scope){
				var btn_wrap_in_piece_html = lenovoBack.html.get_btn_wrap_in_piece();
				$scope.find('.'+lenovoBack.setting.btn_cntr_in_piece).each(function(){
					var $this = $(this);
					$this.append(btn_wrap_in_piece_html);
					var s_b_i = $this.attr('b_i');
					var $w_h = $this.find('.btn_in_piece1');
					$w_h.hide();
					if(s_b_i){
						var a_b_i = s_b_i.split(',');
						//var s = '宽:'+a_b_i[0]+',  高:'+a_b_i[1];
						$w_h.eq(1).text('宽 : '+a_b_i[0]);
						$w_h.eq(2).text('高 : '+a_b_i[1]);
						//$w_h.show();//说去掉，我直接不让其显示就OK了
					}
				});				
			}
		},
		ajax : {
			ajax_com : function(url,sucFn,data,dataType,methodType,errFn,completeFn){
				$.ajax({
		            method : methodType || 'GET',
		            url : url,
		            data : data || {},
		            dataType : dataType || '',
		            success : function(msg){
		                sucFn&&sucFn(msg);
		            },
		            error : function(msg){
		                errFn&&errFn(msg);
		            },
		            complete : function(){
		                completeFn&&completeFn();
		            }
		        });
			},
			addpiece : function($piece_cntr,$piece_li){//选中碎片时的接口,这个接口正式环境不用
				var piece_data_url = $piece_li.attr('piece_data_url');
				var url = 'data/test/'+piece_data_url+'.js';
				$piece_cntr.attr('fid','9da7a713-fc8f-55f8-8d7e-c08f1db7bbb6');//模仿正式环境，截入碎片后，返回一个真ID
				if(lenovoBack.setting.mode){
					this.ajax_com(url,function(msg){
						$piece_cntr.find('.piece').remove();
						//$piece_cntr.removeClass('back_height').removeAttr('style').append(msg);
						lenovoBack.fn.rm_back_show_style($piece_cntr);
						$piece_cntr.append(msg);
						console.log('碎片加入成功......');
						lenovoBack.fn.parse_btn_in_piece($piece_cntr);
					},null,'html',null,function(){
						console.log('碎片加入失败......');
					});
				}
			},
			findpieces : function($piece_cntr){//选择碎片时的接口,模式2时才会被调用
				console.log('f_h:'+$piece_cntr.attr('f_h'));
				this.ajax_com(lenovoBack.setting.findpieces_url,function(msg){
					console.log('查找碎片.....'+msg);
					if(msg.retCode==0){
						//这里有可能有一个最终转成我要的格式的方法msg_to_findpieces_html
						var html = lenovoBack.html.msg_to_findpieces_html(msg);
						$('#chose_pieces_cntr').find('.piece_ul').empty().append(html);
					}else{
						console.log('查寻碎片列表失败...');
					}
				},{
					t_type : $piece_cntr.parents('.'+lenovoBack.setting.floor_cntr).attr('ptype'),
					t_width : $piece_cntr.width(),
					floorId : $piece_cntr.attr('fid'),
					t_height : $piece_cntr.attr('f_h')//f_h
				},'json');
			},
			saveorder : function($floor_cntr,fn){//增加楼层时的接口
				if(lenovoBack.setting.mode != 2){
					fn&&fn();
					return;
				}

				if(lenovoBack.setting.mode == 2){//如果是正式环境
					console.log('------按块保存排序号接口');
					this.ajax_com(lenovoBack.setting.updfloorSort_url,function(msg){//保存成功后再进行页面的操作
						if(msg.retCode==0){
							fn&&fn();
						}else{
							console.log('楼层增加失败....');
						}
					},{
						//参数
						idMapOrderNums : lenovoBack.fn.id_map_ordnum($floor_cntr)
					},'json',null,function(){
						alert('保存失败...请刷新页面');//这里应该自动刷新也可以
					});
				}
			},
			delpiece_cntr : function($current_piece_cntr){
				if(lenovoBack.setting.mode != 2){
					lenovoBack.fn.after_floor_remove($current_piece_cntr);
					return;
				}

				if(lenovoBack.setting.mode == 2){//如果是正式环境
					console.log('------删除楼层的接口');
					this.ajax_com(lenovoBack.setting.del_piece_cntr_url,function(msg){//删除成功后再进行页面的操作
						if(msg.retCode==0){
							console.log('删除楼层成功.....');
							lenovoBack.fn.win_reload();
							//删除成功后刷新，因为是刷新页面，所以后面的页面操作不用了。
							//lenovoBack.fn.after_floor_remove($current_piece_cntr);
						}else{
							console.log('删除楼层失败.....');
						}
					},{
						id : $current_piece_cntr.attr('fid')
					},'json');
				}
				
			},
			//floor/createfloor?sort=1& f_width=10&pageType=1&block_value=123
			create_floor : function(fn,$current_piece_cntr,pageType){
				this.ajax_com(lenovoBack.setting.createfloor_url,fn,{
					sort : $current_piece_cntr.attr('ordnum'),
					f_width : $current_piece_cntr.width(),
					pageType : pageType || 1,
					block_id : $current_piece_cntr.parents('.'+lenovoBack.setting.floor_cntr).attr('bid')
				},'json',null,function(){
					console.log('create_floor失败...');
				});
			},
			//建立楼层与碎片的关联
			floor_map_piece : function(fid,pieceid){
				this.ajax_com(lenovoBack.setting.floor_map_piece_url,function(msg){
					if(msg.retCode==0){
						console.log('执行成功后关闭....'+msg);
						$('#chose_pieces_cntr').hide();
						//然后刷新页面
						lenovoBack.fn.win_reload();
					}else if(msg.retCode==1){
						console.log('执行成功后关闭....'+msg);
						$('#chose_pieces_cntr').hide();
						$('#'+pieceid).attr('data','test');
						console.log('到这儿了........................'+msg.data);

						//然后刷新页面
						lenovoBack.fn.win_reload();
					}else{
						console.log('建立楼层与碎片的关联失败...');
					}
				},{//id=楼层id&tid=模版id
					id : fid,
					tid : pieceid
				},'json');
			},
			make_html : function(){
				this.ajax_com($('.back').attr('makeurl'),function(msg){
					if(msg.retCode==0){
						window.open($('.back').attr('htmlurl'),'_blank');
					}else{
						console.log('生成静态页面失败...');
					}
				},null,'json',null,function(){
					console.log('生成静态页面失败error....');
				});
			}
		},
		bind : function(){
			var _this = this;

			//生成静态页按钮事件 
			$('.back').delegate('.btn9','click',function(){
				lenovoBack.ajax.make_html();
			});

			//预览按钮事件 
			$('.back').delegate('.btn10','click',function(){
				window.open($('.back').attr('prevurl'),'_blank');
			});

			//选择碎片按钮事件 
			$('.back').delegate('.btn1','click',function(){
				lenovoBack.setting.$current_piece_cntr = $(this).parents('.'+lenovoBack.setting.piece_cntr);
				if(lenovoBack.setting.mode!=2){
					$('#chose_pieces_cntr').show();
					return;
				}
				if(lenovoBack.setting.mode==2){
					var fid = lenovoBack.setting.$current_piece_cntr.attr('fid');
					if(fid&&fid.length!=36){//如果id不是36位则是假楼层,需要调用创建楼层的接口
						lenovoBack.ajax.create_floor(function(msg){
							if(msg.retCode==0){//成功
								lenovoBack.setting.$current_piece_cntr.attr('fid',msg.data);
								$('#chose_pieces_cntr').show();
								lenovoBack.ajax.findpieces(lenovoBack.setting.$current_piece_cntr);
								
							}
						},lenovoBack.setting.$current_piece_cntr);
					}else{
						$('#chose_pieces_cntr').show();
						lenovoBack.ajax.findpieces(lenovoBack.setting.$current_piece_cntr);
					}
					
				}
				
			});

			//删除楼层
			$('.back').delegate('.btn3','click',function(){
				if(confirm('确认删除吗？')){
					//如果当前的块内只有一个楼层了，则不能删除
					//如果最后一个是真楼层，则删除并生成一个新的假楼层来代替，如果最后一个是假楼层，则弹出提示，不能删除最后一个楼层
					var $piece_cntrs = $(this).parents('.'+lenovoBack.setting.floor_cntr).find('.'+lenovoBack.setting.piece_cntr);
					var floorSize = $piece_cntrs.length;
					var $current_piece_cntr = $(this).parents('.'+lenovoBack.setting.piece_cntr);
					var fid = $current_piece_cntr.attr('fid');
					//alert(floorSize+'--'+fid);
					if(floorSize<=1&&fid&&fid.length!=36){
						alert('块里至少有一个楼层，删除失败！');
						return;
					}
					lenovoBack.ajax.delpiece_cntr($current_piece_cntr);
				}
			});

			$('.back').delegate('.btn7','click',function(){
				console.log('点击跳转....');
				var $piece_cntr = $(this).parents('.piece_cntr');
				var url = lenovoBack.setting.floorConfig_url+'?floorId='+$piece_cntr.attr('fid');
				//alert('tell me where you want to go baby~');
				window.open(url,"测试窗口","height=600,width=1100,top=100,left=200");
			});

			//跟移动楼层有关
			(function(){
				//向上移动楼层
				$('.back').delegate('.btn5','click',function(){
					var $current_piece_cntr = $(this).parents('.'+lenovoBack.setting.piece_cntr);
					var $target_piece_cntr = $current_piece_cntr.prev('.'+lenovoBack.setting.piece_cntr);
					_this.fn.piece_cntr_move($current_piece_cntr,$target_piece_cntr,'after');
				});

				//向下移动楼层
				$('.back').delegate('.btn6','click',function(){
					var $current_piece_cntr = $(this).parents('.'+lenovoBack.setting.piece_cntr);
					var $target_piece_cntr = $current_piece_cntr.next('.'+lenovoBack.setting.piece_cntr);
					_this.fn.piece_cntr_move($current_piece_cntr,$target_piece_cntr,'before');
				});
			})();

			//跟增加楼层有关的绑定
			(function(){
				//向下增加楼层
				$('.back').delegate('.btn2','click',function(){
					var floorHTML = _this.html.getFloor();
					var $parent = $(this).parents('.'+lenovoBack.setting.piece_cntr);

					var $floor_cntr = $(this).parents('.'+lenovoBack.setting.floor_cntr);
					var floor_max_num = $floor_cntr.attr('floor_max_num');
					var cur_floor_num = $floor_cntr.find('.'+lenovoBack.setting.piece_cntr).length;
					if(floor_max_num!=undefined&&cur_floor_num>=floor_max_num){
						alert('该块最多只能增加'+floor_max_num+'个楼层!');
						return;
					}
					//在下面增加一个楼层
					_this.fn.add_floor_after(floorHTML,$parent);
				});

				//向上增加楼层
				$('.back').delegate('.btn4','click',function(){
					var floorHTML = _this.html.getFloor();
					var $parent = $(this).parents('.'+lenovoBack.setting.piece_cntr);

					var $floor_cntr = $(this).parents('.'+lenovoBack.setting.floor_cntr);
					var floor_max_num = $floor_cntr.attr('floor_max_num');
					var cur_floor_num = $floor_cntr.find('.'+lenovoBack.setting.piece_cntr).length;
					if(floor_max_num!=undefined&&cur_floor_num>=floor_max_num){
						alert('该块最多只能增加'+floor_max_num+'个楼层!');
						return;
					}
					//在上面增加一个楼层
					_this.fn.add_floor_before(floorHTML,$parent);
				});

			})();

			//跟碎片选择弹出窗口有关的绑定事件
			(function(){
				//mouseover时预览效果图
				$('.back').delegate('.piece_ul li',{
					mouseover : function(){
						var imgurl = $(this).attr('imgurl');
						$('#chose_pieces_cntr .prev_view img').attr('src',imgurl);
					},
					click : function(){
						//var piece_data_url = $(this).attr('piece_data_url');
						if(lenovoBack.setting.mode!=2){
							$('#chose_pieces_cntr').hide();
							lenovoBack.ajax.addpiece(lenovoBack.setting.$current_piece_cntr,$(this));
						}else{
							var fid = lenovoBack.setting.$current_piece_cntr.attr('fid');
							var pieceid = $(this).attr('piece_data_url');
							lenovoBack.ajax.floor_map_piece(fid,pieceid);
						}
					}
				});

				$('.back').delegate('.bg3','click',function(){
					$('#chose_pieces_cntr').hide();
				});
				$(document.body).click(function(event){
					if(event.target==this){
						$('#chose_pieces_cntr').hide();
					}
				});
			})();

			//跟载入的碎片有关的
			(function(){
				//点击编辑按钮时
				$('.back').delegate('.btn_in_piece','click',function(){
					var $p_btn_cntr = $(this).parents('.'+lenovoBack.setting.btn_cntr_in_piece);
					var datatype = $p_btn_cntr.attr('datatype');
					var sort = $p_btn_cntr.attr('sort');
					var floorId = $(this).parents('.'+lenovoBack.setting.piece_cntr).attr('fid');
					console.log('datatype:'+datatype+'   sort:'+sort+'   floorId:'+floorId);
					var a_b_i = $p_btn_cntr.attr('b_i');
					var parm_b_i = '';
					if(a_b_i){//如果有，说明有宽高值等信息
						var params = a_b_i.split(',');
						parm_b_i = '&imgWidth='+params[0]+'&imgHeight='+params[1]+'&imgSize='+params[2];
					}
					var url = lenovoBack.setting.to_edit_data_page_url+'?type='+datatype+'&sort='+sort+'&floorId='+floorId+parm_b_i;
					//alert('tell me where you want to go baby~');
					window.open(url,"测试窗口","height=600,width=1100,top=100,left=200");
					
				});

				//该方法是编辑按钮如果点不到时，可以直接用回车键去实现相同的功能，但没有直接点击编辑按钮的效率高
				$(document).keyup(function(event){
					if(event.keyCode==13){
						var $the_bg = null;
						var $btn_bgs = $('.btn_bg_in_piece');
						var length = $btn_bgs.length;

						for(var i = 0,j = length; i < j ; i++){
							if($btn_bgs.eq(i).css('opacity')=='0.7'){
								$the_bg = $btn_bgs.eq(i);
								break;
							}
						}
						if($the_bg){
							$the_bg.next().click();
						}
					}
				});
			})();
		},
		run : {
			//页面的初始化动作
			page_init : function(){
				$('.'+lenovoBack.setting.piece_cntr).each(function(){
					var $this = $(this);
					//给每个碎片容器增加操作按钮
					var allBtns = lenovoBack.html.getAllBtns($this);
					$this.append(allBtns);
					//页面初始化时对所有的碎片容器生成随机背景色
					$this.css('background-color',lenovoBack.fn.getRandColor());

					//给每个碎片容器增加back_height类名
					//$this.addClass('back_height');
					//最后判断，如果楼层的下面有piece类名，说明有数据了，这时候去掉后台用于展示的宽高类
					lenovoBack.fn.has_piece();
				});

				//加入选择碎片的html
				var chose_pieces_win_str = lenovoBack.html.getChosePiecesWin();
				$('.back').append(chose_pieces_win_str);
				//加入生成静态页按钮
				var generate_html_btn_str = lenovoBack.html.getGenerateHTMLBtn();
				$('.back').append(generate_html_btn_str);
				$('#generate_html_btn').css('right',($(document.body).width()-1200)/2-28);

				//加入预览按钮
				var prev_html_btn_str = lenovoBack.html.getPrevViewHTMLBtn();
				$('.back').append(prev_html_btn_str);
				$('#prev_view_btn').css({'right':($(document.body).width()-1200)/2-28-33});
				//$('#prev_view_btn').css('right',($(document.body).width()-1200)/2-28);
			},
			
			//当一个碎片加入后要执行的动作
			//direct 方向，向上before或者向下after
			piece_after_add : function($cur_piece_cntr,$newfloor_piece,direct){
				//加入序号
				lenovoBack.fn.piece_cntr_after_change($cur_piece_cntr,$newfloor_piece);
				lenovoBack.fn.add_order_num($cur_piece_cntr,$newfloor_piece,direct,$newfloor_piece);
				
			},
			piece_cntr_after_del : function(){
				lenovoBack.fn.piece_cntr_after_change($current_piece_cntr,$target_piece_cntr);
			}
		}
	};

	backObject.init = function(){
		lenovoBack.run.page_init();
		juicer.set({
			'tag::interpolateOpen': 'lenovo{',
    		'tag::interpolateClose': '}'
		});
		lenovoBack.bind();
		console.log('当前模式：   '+lenovoBack.setting.mode +',    当前颜色模式：  '+lenovoBack.setting.colormode);
	}
	backObject.reload = function(){
		lenovoBack.fn.win_reload();
	}
	backObject.test = lenovoBack.fn.parse_btn_in_piece;//用于测试，方便在test.html中看到后台编辑按钮

})(window,jQuery);

$().ready(function(){
	backObject.init();
});