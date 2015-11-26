var _lenovo_inc_reference = {
    html:function(url,container){
        this.loadFile(url,function(d){
            $(container).append(d);
        })
    },
    js:function(url){
        this.loadFile(url,function(d){
            $("html").append(d);
        })
        return this;
    },
    css:function(url){
        this.loadFile(url,function(d){
            $("head").append(d);
        })
        return window._lenovo_inc_reference;
    },
    loadFile:function(url,callback){
        $.ajax({
            url:url,
            success:function(d){
                if(d && callback){
                    callback(d);
                }
            },
            error:function(a,b,c){
                console.log(b);
            }
        })
    }
}