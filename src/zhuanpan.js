function Zhuanpan(opt){
	this.opt = opt || {};
	this.$container = this.opt.$container || $('.panzone');
	this.$startBtn = this.opt.$startBtn || $('#start');
	this.$img1 = this.opt.$img1 || $("#img_t");//真图
	this.$img2 = this.opt.$img2 || $("#img_f");//假图
	//this.chance_num = 0;//抽奖剩余次数，页面进来时获取
	this.trynum = 8;//尝试8次，还是不行的话就提示网络异常,请稍后重试

	this.ajax_return_flag = false;//默认请求未返回
	this.target = 0;//中奖角度
	this.msg = '';//恭喜中奖信息
	this.prizetype = 1;//默认为非实物中奖 0为实物中奖

	this.global_ajaxdomain = 'http://www.lenovo.com.cn/srv/';
	this.wheel_id = '740b7523-35c6-4d1d-8191-1c9863e0e1eb';

	this.islogin_flag = true;//默认登陆成功
	this.forlogin_url = '';

	this.canclick = true;

	this.init();
}
Zhuanpan.prototype = {
	constructor : Zhuanpan,
	init : function(){
		this.init_ajax();//先判断一下用户是否登陆
		this.bind();
	},
	init_ajax : function(){
		this.ajax.heros(this,{});
		if(window.passport!=undefined && window.passport.isLogin){//联想
			//console.log('lenovo init');
			if(passport.isLogin()){//登陆成功
				//console.log('lenovo success');
				islogin_flag = true;
				//登陆成功后再去调用用户抽奖次数接口
				this.ajax.choujiangcishu(this,{});
			}
		}else{
			//上来直接去调用抽奖次数接口
			//console.log('moto init');
			this.ajax.choujiangcishu(this,{});
		}
	},
	gologinpage : function(){//登陆后都要刷新一下页面
		window.location.href = this.forlogin_url;
		//_this.opt.nologin_show && _this.opt.nologin_show();
	},
	bind : function(){
		var _this = this;
		this.$startBtn.click(function(){

			if(!passport.isLogin()){//登陆成功
				$('#LoginID').click();
				return;
			}

			if(!_this.canclick){
				return;
			}

			//转前检查
			if(_this.validate()==0){
				return;
			}
			
			//开始的时候，真的隐藏，假的显示
	        _this.$img1.hide();
	        _this.$img2.show();
	        _this.rotation_f();
	        _this.canclick = false;
	        _this.ajax.choujiang(_this,{sucFn:function(msg){
	        	//console.log(msg.rc+'-------choujiang_msg.rc');
	        	if(msg.rc==0){
	        		_this.ajax_return_flag = true;
	        		_this.target = -msg.angle;
	        		_this.msg_jiangpin = msg.msg;
	        		_this.prizetype = msg.prizetype;

	        		_this.chance_num--;//每抽一次，则抽奖数次减1（这一步主要是不刷新页面时前端进行控制时的判断依据）,这里需要判断一下是放到这里还是放到stop里比较合适
	        		if(_this.chance_num==0){
	        			_this.msg = '嗷嗷，您的抽奖次数用完啦！';
	        		}


	        	}else if(msg.rc==401){//未登陆状态
	        		_this.stop();
	        		_this.gologinpage();
	        	}

	        	
	        	
	        }});//发起抽奖请求
		});
	},
	rotation_f : function(){
		var _this = this;
		this.$img2.rotate({
            angle:0, 
            animateTo:(3600+_this.target), 
            callback: function(){
            	_this.scan();
            },
            duration:2000,
            easing: function(x,t,b,c,d){
                return c*(t/d)+b;
            }
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
	scan : function(){//检查是否已返回值
		//console.log(this.ajax_return_flag+'------00---'+this.trynum);
		this.trynum--;
		if(this.trynum <= 0){
			this.$img2.stopRotate();
			alert('网络异常,请稍后重试');
			this.trynum = 8;
			this.canclick = true;
			return;
		}

		if(this.ajax_return_flag){
			//console.log('truez');
	        this.$img2.stopRotate();
	        this.$img2.hide();
	        this.$img1.show();

	        this.rotation_t();

	        this.trynum = 8;
	    }else{
	    	//console.log('falsez');
	        this.rotation_f();
	    }
	},
	stop : function(){
		if(this.prizetype==1){//非实物中奖
			this.opt.gongxizhongjiang_show && this.opt.gongxizhongjiang_show(this.msg_jiangpin);
		}else{//实物中奖
			this.opt.wanshandizhi_show && this.opt.wanshandizhi_show(this.msg_jiangpin);
		}
		this.$img1.stopRotate();
      	this.ajax_return_flag = false;
      	this.canclick = true;
	},
	validate : function(){
		//判断是否登陆
		if(!this.islogin_flag){
			this.opt.nologin_show && this.opt.nologin_show(this.msg);
			return 0;
		}
		if(this.chance_num<=0){
			this.opt.nochance_show && this.opt.nochance_show(this.msg);
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
		/*islogin : function(opt){
			opt.url = 'test';
			this.common(opt);
		},*/
		choujiang : function(_this,opt){
			opt.url = _this.global_ajaxdomain + 'lotterydraw.do?plat=4&rotatingwheelid=' + _this.wheel_id;
			opt.dataType = 'json';
			this.common(opt);
		},
		choujiangcishu : function(_this,opt){
			opt.url = _this.global_ajaxdomain + 'canlotterydraw.do?plat=4&rotatingwheelid=' + _this.wheel_id;
			opt.dataType = 'json';
			opt.sucFn = function(msg){
				if(msg.rc==0){
					_this.chance_num = msg.chance;
					_this.msg = msg.msg;
				}else if(msg.rc==401){
					//登陆不成功
					_this.gologinpage();
				}
			}
			this.common(opt);
		},
		heros : function(_this,opt){
			opt.url = _this.global_ajaxdomain + 'lotterydrawhistory.do?plat=4&rotatingwheelid=' + _this.wheel_id;
			opt.dataType = 'json';
			opt.sucFn = function(msg){
				if(msg.rc==0){
					var html_trs = _this.fn.get_trs(msg.prizelist);
					$('.heros > table').empty().append(html_trs);
					new ScrollTop({$container : $('.heros > table')}).play();
				}else if(msg.rc==401){
					//登陆不成功
					_this.gologinpage();
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