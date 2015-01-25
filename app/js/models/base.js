define(['underscore', 'backbone'], function(_, Backbone) {
	var BaseModel = Backbone.Model.extend({
		
		SessionExpirationErrorCode: '419',
		
		$fetch: function(callbacks){
			var self = this;
			self.fetch({
				success: callbacks.success,
				error: function(obj, response, options){
					if(response.error == self.SessionExpirationErrorCode){
						console.log('The session has expired. Reconnecting...');
						window.LoggedUser.login(null,function(logged){
							if(logged){
								self.fetch(callbacks);
							}
						});
					}
					else {
						callbacks.error();
					}
				}
			});
		},
		
		$save: function(params,callbacks){
			var self = this;
			self.save(params,{
				type: 'POST',
				success: callbacks.success,
				error: function(obj, response, options){
					if(response.error == self.SessionExpirationErrorCode){
						console.log('The session has expired. Reconnecting...');
						window.LoggedUser.login(null,function(logged){
							if(logged){
								self.save(params,callbacks);
							}
						});
					}
					else {
						callbacks.error();
					}
				}
			});
		},
		
		loadMainMenuLinks: function(callback){
			if(BaseModel.MenuLinks.length>0) return callback(BaseModel.MenuLinks);
			var self = this;
			var domain = window.staticCDN || ''; 
			this.url = domain + '/lang/'+ this.get('code') +'/links.json?nocache='+Math.random();
        	this.$fetch({
        		success: function(obj, response, options){
            		BaseModel.MenuLinks = obj.categories;
            		return callback(BaseModel.MenuLinks);
            	}
        	});
		}
		
	},
	// static properties and methods
	{
		MenuLinks: []
	});
	return BaseModel;
});
