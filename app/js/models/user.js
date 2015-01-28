define([
  'underscore',
  'backbone',
  'utils',
  'models/base',
  'models/association',
  'collections/associations'
], function(_, Backbone, Utils, BaseModel, Association, Associations){
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
	   		var pswd = password;
	   		if(window.LoggedUser){
	   			// BUG: If called from ChangeUserPassword, the provided oldPassword will be overwritten.
	   			pswd = window.LoggedUser.get('password');
	   		}
	   		var self = this;
	   		this.parse = this.defaultParse;
	   		this.url = Utils.buildUrl('/v2/users/authenticate',{
	   			email: self.get('properties').email,
	   			password: pswd
	   		});
        	this.$fetch({
        		success: function(model, response, options){
        			// persist session in localstorage
        			localStorage.setItem('userSession',model.get('session'));
        			localStorage.setItem('userKey',model.get('key'));
            		window.LoggedUser = model;
            		window.LoggedUser.set('password',pswd);
            		self.updateSideMenu(function (success) {
            			callback(true); // continue regardless
            		});
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
	   	getData: function(callback){
	   		var self = this;
	   		this.parse = this.defaultParse;
	   		this.url = Utils.buildUrl('/v2/users/userdata',{});
	   		this.$fetch({
        		success: function(model, response, options){
        			callback(true, model, response);
            	},
            	error: function(model, response, options){
            		console.log('Error User.getData');
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
	   		var self = this;
	   		this.url = Utils.buildUrl('/v2/users/changepassword',{
	   			password: passwd
	   		});
	   		this.$fetch({
        		success: function(model, response, options){
        			callback(true, model, response);
            	},
            	error: function(model, response, options){
            		console.log('Error User.updatePassword');
            		callback(false, model, response);
            	}
        	});
	   	},
	   	changeClub: function(newAssociation,callback){
	   		this.get('properties').association = newAssociation;
	   		this.update(callback);
	   	},
	   	updateSideMenu: function(callback){
	   		var name = this.get('properties').firstName + ' ' + this.get('properties').lastName;
	   		var email = this.get('properties').email;
	   		$('.supporter-logged-user-name').text(name);
	   		$('.supporter-logged-user-email').text(email);
	   		var clubId = this.get('properties').association;
	   		if(clubId){
	   			new Associations().getById(clubId,function(club){
	   				if (club === null) {
	   					console.log('Error User.updateSideMenu');
	   					callback(false);
	   				} else {
			   			window.LoggedUser.set('clubName',club.get('name'));
		   				$('.supporter-logged-user-club').attr('src',club.get('logo').sizes.thumbnail.file);
		   				callback(true);
		   			}
		   		});
	   		}
	   		else {
	   			callback(false);
	   		}
	   	}
	},
	// static properties
	{
		
	});
	return User;
});
