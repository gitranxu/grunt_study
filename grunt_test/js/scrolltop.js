function ScrollTop(opt){
	this.opt = opt || {};
	this.onetime = this.opt.onetime || 3000;//滚动一次需要的时间
	this.movetime = this.opt.movetime || 1000;//完成一次滚动需要的时间
	this.$container = this.opt.$container;//可能是ul也可能是table
	this.type = this.opt.type || 'table';//默认是table轮播
	this.row_tag_name = this.opt.row_tag_name || 'tr';
	this.oneline_height = 0;//一行的高度
	this.size = 0;
	this.total_height = 0;//总的高度（一份的高度）
	this.init_top = 0;//初始位置
	this.init();
}
ScrollTop.prototype = {
	constructor : ScrollTop,
	init : function(){//初始化时需要完成的工作：1.将数据复制两份

		this.init_top = this.$container.position().top;

		if(this.type!='table'){ // ul的情况
			this.row_tag_name = 'li';
		}
		this.oneline_height = this.$container.find(this.row_tag_name).height();
		this.size = this.$container.find(this.row_tag_name).size();
		this.$container.append(this.$container.find(this.row_tag_name).clone());

	},
	play : function(){
		var _this = this;
		setInterval(function(){
			var top = _this.$container.position().top;
			_this.$container.animate({top:top-_this.oneline_height},_this.movetime,function(){
				if(_this.total_height==_this.size*_this.oneline_height){
					_this.$container.css('top',_this.init_top);
					_this.total_height = 0;
				}
			});
			//i_count++;
			_this.total_height += _this.oneline_height;
		},this.onetime);
	}
}
