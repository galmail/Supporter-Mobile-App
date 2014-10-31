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
        	
        	
        	
        	
        	
        });
    }
);