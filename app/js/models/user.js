define([
  'underscore',
  'backbone',
  'utils',
  'models/base',
  'models/association'
], function(_, Backbone, Utils, BaseModel, Association){
	var User = BaseModel.extend({
		
		defaults: {
			session: null,
			key: null,
			password: null,
			properties: {
				association: null,
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
				pin: null,
				birthdate: {
					day: null,
					month: null,
					year: null
				}
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
        		city: data.city,
        		gender: data.gender,
        		birthdate: {
        			year: data.year,
        			month: data.month,
        			day: data.day
        		}
        	};
        	return { properties: attrs };
        },
	   	
	   	//// methods ////
	   	
	   	login: function(password, callback){
	   		var pswd = password || User.LoggedUser.get('password');
	   		var self = this;
	   		this.parse = this.defaultParse;
	   		this.url = Utils.buildUrl('/v2/users/authenticate',{
	   			email: this.get('properties').email,
	   			password: pswd
	   		});
        	this.$fetch({
        		success: function(model, response, options){
        			// persist session in localstorage
        			localStorage.session = model.get('session');
            		User.LoggedUser = model;
            		User.LoggedUser.set('password',pswd);
            		window.LoggedUser = User.LoggedUser;
            		self.updateSideMenu();
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
	   			association: this.get('properties').association
	   		});
        	this.$fetch({
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
	   		this.$fetch({
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
        	this.$save(this.get('properties'),{
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
	   	},
	   	changeClub: function(newAssociation,callback){
	   		this.get('properties').association = newAssociation;
	   		this.update(callback);
	   	},
	   	updateSideMenu: function(){
	   		console.log('Im in updateSideMenu...');
	   		var name = this.get('properties').firstName + ' ' + this.get('properties').lastName;
	   		var email = this.get('properties').email;
	   		$('#supporter-logged-user-name').text(name);
	   		$('#supporter-logged-user-email').text(email);
	   		var club = new Association({ id: this.get('properties').association });
	   		club.load(function(ok){
	   			if(ok){
	   				$('#supporter-logged-user-club').attr('src',club.get('logo').sizes.thumbnail.file);
	   			}
	   		});
	   	}
	},
	// static properties
	{
		LoggedUser: null
	});
	return User;
});
