<!--统计代码-->

<!--DMP start-->
<script type="text/javascript">
  var _dmp_think_lenovoid = "";
  var _maq = _maq || [];
  try {
  	_dmp_think_lenovoid = passport.cookie.lenovoId;
  }catch(e) {
  }
  _maq.push(["setUserId",_dmp_think_lenovoid]);
</script>
<script type="text/javascript">
  var _maq = _maq || [];
    (function(){ var u="http://s.think.cn.maysunmedia.com/";
    _maq.push(["setSiteId", "2001-8001"]);
    _maq.push(["setTrackerUrl", u+"track/dstat"]);
    _maq.push(["trackPageView"]);
    _maq.push(["enableLinkTracking"]);
    var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];
    g.type="text/javascript"; g.defer=true; g.async=true; g.src=u+"js/ms-stat.min.js";
    s.parentNode.insertBefore(g,s);
})();
</script>
<script type="text/javascript" src="http://s.think.cn.maysunmedia.com/js/m_code.js"></script>
<!--DMP end-->



<!--PIWIK-->
<script type="text/javascript">
<!--
	/*******************piwik_new_begin*********************/
var global_monitorurl = "//shop.click.lenovo.com.cn/collect";
var global_monitorjs = "//shop.click.lenovo.com.cn/analytics.js";
var global_monitorid = 0;
if (typeof _lenovo_piwik_platid != "undefined") {
        global_monitorid = _lenovo_piwik_platid;
}
var _paq = _paq || [];
function piwik_loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (callback)
        script.onload = script.onreadystatechange = function () {
            if (script.readyState && script.readyState != 'loaded' && script.readyState != 'complete')
                return;
            script.onreadystatechange = script.onload = null;
            callback();
        };
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function piwik_pc_track_event(category, action, json_data) {
    try {
        var obj = Piwik.getAsyncTracker();
        obj.setCustomData(json_data);
        obj.setSiteId(global_monitorid);
        obj.trackEvent(category, action, 'data', 1);
    } catch (err) {
        if (console) {
            console.log(err);
        }
    }
}


function piwik_pc_track(json_data) {
    try {
        var obj = Piwik.getAsyncTracker();
        obj.setSiteId(global_monitorid);
        obj.setTrackerUrl(global_monitorurl);
        obj.enableLinkTracking();
        obj.setCustomData(json_data);
        obj.trackPageView();
    } catch (err) {
        if (console) {
            console.log(err);
        }
    }
}


  var _piwik_think_lenovoid = "";
  var _maq = _maq || [];
  try {
  	_piwik_think_lenovoid = passport.cookie.lenovoId;
  	var piwik_data = { "lenovoid": lenovoid }
  }catch(e) {
  }

function piwik_callback() {
    var json_data = {};
    if (typeof piwik_data != "undefined") {
        json_data = piwik_data;
    }
    if (typeof page_id != "undefined") {
        json_data["page_id"] = page_id;
    }
    json_data["page_type"] = "pc";
    piwik_pc_track(json_data);
}
piwik_loadScript(global_monitorjs, piwik_callback);
/******************piwik_new_end*******************/
//-->
</script>
<!--PIWIK end-->
