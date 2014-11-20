define(['underscore', 'backbone'], function(_, Backbone) {
	var BaseCollection = Backbone.Collection.extend({
		
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
						return callbacks.error;
					}
				}
			});
		},
		
		$save: function(params,callbacks){
			var self = this;
			self.save(params,{
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
						return callbacks.error;
					}
				}
			});
		}
		
		
	});
	return BaseCollection;
});
