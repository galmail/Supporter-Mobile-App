define([
  'underscore',
  'backbone'
], function(_, Backbone){
	var User = Backbone.Model.extend({
		defaults: {
			session: null,
			key: null,
			association: null,
			properties: {
				email: null,
				firstName: null,
				lastName: null,
				street: null,
				zipCode: null,
				city: null,
				country: null,
				mobileNumber: null,
				currency: null,
				gender: null,
				pin: null
			}
		},
		initialize: function(email,association){
			this.properties = {};
			this.properties.email = email;
			this.association = association;
	   	},
	   	parse: function(response){
        	return response.data;
        },
	   	login: function(password, callback){
	   		this.url = '/v2/users/authenticate?email='+encodeURIComponent(this.properties.email)+'&password='+encodeURIComponent(password);
        	this.fetch({
        		success: function(model, response, options){
        			// persist session in localstorage
        			localStorage.session = model.get('session');
            		callback(true);
            	},
            	error: function(model, response, options){
            		console.log('Error User.login');
            		callback(false, response);
            	}
        	});
	   	},
	   	signUp: function(password, callback){
	   		var self = this;
	   		this.url = '/v2/users/create?email='+encodeURIComponent(this.properties.email)+'&password='+encodeURIComponent(password)+'&association='+this.association;
        	this.fetch({
        		success: function(model, response, options){
        			self.login(password, callback);
            	},
            	error: function(model, response, options){
            		console.log('Error User.signUp');
            		callback(false);
            	}
        	});
	   	}
	   	
	   	
	   	
	   	
	   	
	   	
	});
	return User;
});
