function Zhuanpan(opt){
	this.opt = opt || {};
	this.$container = this.opt.$container || $('.panzone');
	this.$startBtn = this.opt.$startBtn || $('#start');
	this.$fasong = this.opt.$fasong || $('.fasong');
	this.$img1 = this.opt.$img1 || $("#img_t");//真图
	//this.chance_num = 0;//抽奖剩余次数，页面进来时获取

	this.target = 0;//中奖角度
	this.msg = '默认中奖信息';//恭喜中奖信息
	this.prizetype = 1;//默认为非实物中奖 0为实物中奖

	this.global_ajaxdomain = 'http://www.lenovo.com.cn/srv/';
	this.wheel_id = 'becaaf24-d0ec-470e-b5f3-fb6e18ba6efd';

	this.canclick = true;

	this.init();
}
Zhuanpan.prototype = {
	constructor : Zhuanpan,
	init : function(){
		//this.init_ajax();//先判断一下用户是否登陆
		this.ajax.heros(this,{});
		this.bind();
	},
	bind : function(){
		var _this = this;
		this.$startBtn.click(function(){
			//转前检查
			if(_this.validate()==0){
				return;
			}

			if(!_this.canclick){
				//console.log('不能重复点击');
				return;
			}
			
			//开始的时候，真的隐藏，假的显示
	        _this.canclick = false;
	        _this.ajax.choujiang(_this,{sucFn:function(msg){
	        	if(msg.rc==0){
	        		//_this.ajax_return_flag = true;

	        		_this.target = -msg.angle;
	        		_this.msg = msg.msg;
	        		_this.prizecode = msg.prizecode;
	        		_this.prizetype = msg.prizetype;

	        		_this.rotation_t();

	        		_this.chance_num--;//每抽一次，则抽奖数次减1（这一步主要是不刷新页面时前端进行控制时的判断依据）,这里需要判断一下是放到这里还是放到stop里比较合适
	        	}else if(msg.rc==401){
	        		location.href = _this.global_ajaxdomain + 'moto/login.do';
	        	}else if(msg.rc==10001){//这个是显示上次中奖的码
	        		_this.opt.zuorichongxian_show && _this.opt.zuorichongxian_show(msg);
	        		_this.canclick = true;
	        	}else{
	        		_this.opt.nochance_show && _this.opt.nochance_show(msg);
	        		_this.canclick = true;
	        	}

	        }});//发起抽奖请求
		});

		//点击发送按钮时
		this.$fasong.click(function(){
			var time = 60;
			var $this = $(this);
			if($(this).hasClass('disablebtn')){
				return;
			}
			var phoneno = $('#phoneno').val();
			//console.log(phoneno+'-------------phone111no');
			if($.trim(phoneno)==''||phoneno.length!=11){
				alert('请正常输入手机号');
				return;
			}
			
			_this.ajax.sendphoneno(_this,{phoneno:phoneno});

			$(this).addClass('disablebtn');
			$(this).text('发送中...');
			/*$(this).text(time+'秒后发送');
			var timer = setInterval(function(){
				time--;
				$this.text(time+'秒后发送');
				if(time<=0){
					$this.text('发送');
					$this.removeClass('disablebtn');
					clearInterval(timer);
				}
			},1000);*/
		});
	},
	rotation_t : function(){
		var _this = this;
		$("#img_t").rotate({
            angle:0, 
            animateTo:(3600+_this.target), 
            callback: function(){
            	_this.stop();
            },
            duration:3000
        });
	},
	stop : function(){
		if(this.prizetype==3){//谢谢惠顾
			//alert('谢谢惠顾');
			this.opt.nozhongjiang_show && this.opt.nozhongjiang_show(this.msg);
		}else{//中奖
			this.opt.gongxizhongjiang_show && this.opt.gongxizhongjiang_show(this.msg,this.prizecode);
		}
		this.$img1.stopRotate();
		this.canclick = true;//停下后就可以继续点击了
	},
	validate : function(){
		if(this.chance_num<=0){
			this.opt.nochance_show && this.opt.nochance_show();
			return 0;
		}
		return 1;
	},
	ajax : {
		common : function(opt){
			$.ajax({
	            method : opt.methodType || 'GET',
	            url : opt.url,
	            data : opt.data || {},
	            dataType : opt.dataType || '',
	            success : function(msg){
	                opt.sucFn && opt.sucFn(msg);
	            },
	            error : function(msg){
	                opt.errFn && opt.errFn(msg);
	            },
	            complete : function(){
	                opt.completeFn && opt.completeFn();
	            }
	        });
		},
		choujiang : function(_this,opt){
			opt.url = _this.global_ajaxdomain + 'lotterydraw.do?plat=4&rotatingwheelid='+_this.wheel_id;
			opt.dataType = 'json';
			this.common(opt);
		},
		choujiangcishu : function(_this,opt){
			opt.url = _this.global_ajaxdomain + 'canlotterydraw.do?plat=4&rotatingwheelid='+_this.wheel_id;
			opt.dataType = 'json';
			opt.sucFn = function(msg){
				if(msg.rc==0){
					_this.chance_num = msg.chance;
				}else if(msg.rc==401){
					//登陆不成功
					_this.gologinpage();
				}
			}
			this.common(opt);
		},
		heros : function(_this,opt){
			opt.url = _this.global_ajaxdomain + 'lotterydrawhistory.do?plat=4&rotatingwheelid='+_this.wheel_id;
			opt.dataType = 'json';
			opt.sucFn = function(msg){
				if(msg.rc==0){
					var html_trs = _this.fn.get_trs(msg.prizelist);
					$('.heros > table').empty().append(html_trs);

					var html_big_trs = _this.fn.get_trs(msg.bigprizelist);
					$('.big_heros > table').empty().append(html_big_trs);

					new ScrollTop({$container : $('.heros > table')}).play();
				}else if(msg.rc==401){
					//登陆不成功
					_this.gologinpage();
				}
			}
			this.common(opt);
		},
		sendphoneno : function(_this,opt){
			//console.log('------------sendphoneno');
			opt.url = _this.global_ajaxdomain + 'rotatingwheeltel.do?plat=4&rotatingwheelid='+_this.wheel_id+'&telnum='+opt.phoneno;
			opt.dataType = 'json';
			opt.sucFn = function(msg){
				if(msg.rc==0){
					setTimeout(function(){
						$('#msg3').text('您的短信已经发咯，去看看吧~');
						$('.fasong').text('已发送');
					},8000);
				}
			}
			this.common(opt);
		}
	},
	fn : {
		get_trs : function(prizelist){
			var result = '';
			if(prizelist&&prizelist.length > 0){
				for(var i = 0,j = prizelist.length;i < j;i++){
					var trclass = '';
					if(i%2==0){
						trclass = 'color1';
					}else{
						trclass = 'color2';
					}
					result += '<tr class="'+trclass+'"><td class="col1">'+prizelist[i].membername+'</td><td class="col2">'+prizelist[i].time+'</td><td class="col3">'+prizelist[i].prize+'</td></tr>'
				}
			}
			return result;
		}
	}
}