define([
  'underscore',
  'backbone',
  'utils'
], function(_, Backbone, Utils){
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
		
		initialize: function(){
	   	},
	   	
	   	//// parsers ////
	   	
	   	defaultParse: function(response){
        	return response.data;
        },
        updateParse: function(response){
        	return { properties: response.data };
        },
        pinLookUpParse: function(response){
        	var data = response.data;
        	var attrs = {
        		pin: data.sanitizedPin,
        		firstName: data.first_name,
        		lastName: data.last_name,
        		street: data.street,
        		zipCode: data.zipcode,
        		city: data.city
        	};
        	return { properties: attrs };
        },
	   	
	   	//// methods ////
	   	
	   	login: function(password, callback){
	   		this.parse = this.defaultParse;
	   		this.url = Utils.buildUrl('/v2/users/authenticate',{
	   			email: this.get('properties').email,
	   			password: password
	   		});
        	this.fetch({
        		success: function(model, response, options){
        			// persist session in localstorage
        			localStorage.session = model.get('session');
            		User.LoggedUser = model;
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
	   		this.parse = this.defaultParse;
	   		this.url = Utils.buildUrl('/v2/users/create',{
	   			email: this.get('properties').email,
	   			password: password,
	   			association: this.get('association')
	   		});
        	this.fetch({
        		success: function(model, response, options){
        			self.login(password, callback);
            	},
            	error: function(model, response, options){
            		console.log('Error User.signUp');
            		callback(false, response);
            	}
        	});
	   	},
	   	pinLookUp: function(pin, callback){
	   		var self = this;
	   		this.parse = this.pinLookUpParse;
	   		this.url = Utils.buildUrl('/v2/users/pinlookup',{
	   			pin: pin
	   		});
	   		this.fetch({
        		success: function(model, response, options){
        			callback(true, model, response);
            	},
            	error: function(model, response, options){
            		console.log('Error User.pinLookUp');
            		callback(false, model, response);
            	}
        	});
	   	},
	   	update: function(callback){
	   		this.parse = this.updateParse;
	   		this.url = Utils.buildUrl('/v2/users/update');
        	this.save(this.get('properties'),{
        		success: function(model, response, options){
        			callback(true, model, response);
            	},
            	error: function(model, response, options){
            		console.log('Error User.update');
            		callback(false, model, response);
            	}
        	});
	   	},
	   	updatePassword: function(passwd, callback){
	   		callback(false);
	   	}
	},
	// static properties
	{
		LoggedUser: null
	});
	return User;
});
