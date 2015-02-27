define(
    "utils",
    function (Utils) {
        return new (function Utils(){

        	this.showLoading = function(ms,callback){
        		$('#loader').show();
        		setTimeout(function(){
        			$('#loader').hide();
        			if(typeof(callback)=='function') callback();
        		}, ms);
        	};

        	// native alert notification function
        	this.alert = function(msg,callback,title,btnName){
        		if(navigator.notification){
        			navigator.notification.alert(msg,callback,title,btnName);
        		}
        		else {
        			alert(title + "\n\n" + msg + "\n\n[" + btnName + "]");
        			if(typeof(callback)=='function') callback();
        		}
        	};

        	// build url from params and authenticate
        	this.buildUrl = function(baseUrl,params){
        		var sessionId = localStorage.getItem('userSession');
        		var keyId = localStorage.getItem('userKey');
        		var domain = window.serverURL || '';
        		var url = domain + baseUrl + '?session=' + sessionId;
        		if(typeof(keyId) == "string"){
        			url += '&key=' + keyId;
        		}
        		if(params==null) params = {};
        		$.each(params,function(key,value){
        			url += '&'+key+'='+encodeURIComponent(value);
        		});
        		return url;
        	};

        	this.validateEmail = function(email){
			    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			    return re.test(email);
			};
			
			this.getParameterByName = function(name){
			    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			        results = regex.exec(location.search);
			    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			};

        });
    }
);
