define(
    "utils",
    function (Utils) {
        return new (function Utils(){
        	
        	// native alert notification function
        	this.alert = function(msg,callback,title,btnName){
        		if(navigator.notification){
        			navigator.notification.alert(msg,callback,title,btnName);
        		}
        		else {
        			alert(msg);
        		}
        	};
        	
        	// build url from params and authenticate
        	this.buildUrl = function(baseUrl,params){
        		var sessionId = localStorage.getItem('session');
        		var url = baseUrl + '?session=' + sessionId;
        		if(params==null) params = {}; 
        		$.each(params,function(key,value){
        			url += '&'+key+'='+encodeURIComponent(value);
        		});
        		return url;
        	};
        	
        });
    }
);