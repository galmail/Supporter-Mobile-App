/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/UnifiedRegister.html',
    'views/global/UnloggedView',
    'models/user',
    'collections/operators',
    'utils'
], function ($, _, Backbone, templateSrc, UnloggedView, User, Operators, Utils) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.unified-register',
       	
       	fillData: function(model){
       		var self = this;
       		// fill data
			$.each(model.attributes.properties,function(key,value){
				if(key=='birthdate'){
					self.$el.find('#year').val(model.attributes.properties.birthdate.year);
					self.$el.find('#month').val(("0" + model.attributes.properties.birthdate.month).slice(-2));
					self.$el.find('#day').val(("0" + model.attributes.properties.birthdate.day).slice(-2));
				}
				else {
					self.$el.find('#'+key).val(value);
				}
			});
       	},
       	
       	pinlookup: function(pin){
       		var self = this;
       		window.LoggedUser.pinLookUp(pin,function(success, model, response){
       			if(success){
       				self.fillData(model);
       			}
       			else {
       				var resp = JSON.parse(response.responseText);
        			Utils.alert(resp.message,null,'PIN LookUp','Ok');
       			}
       		});
       	},
       	
       	loadUserData: function(){
       		var self = this;
       		window.LoggedUser.getData(function(success, model, response){
       			if(success){
       				self.fillData(model);
       			}
       			else {
       				var resp = JSON.parse(response.responseText);
        			Utils.alert(resp.message,null,'User Data','Ok');
       			}
       		});
       	},
        
        onRender: function(){
            var self = this;
            if(window.LoggedUser.get('properties').firstName){
        		$('#createBtn').hide();
        		$('#updateBtn').show();
        		//$('#cancelBtn').attr('href','#userSettings');
        		if(window.LoggedUser.get('properties').pin){
        			$('#pin').prop('disabled', true);
        		}
        		else {
        			$('#pin').prop('disabled', false);
        		}
        		self.loadUserData();
        	}
        	else {
        		$('#createBtn').show();
        		$('#updateBtn').hide();
        		//$('#cancelBtn').attr('href','javascript:window.history.back();');
        		$('#pin').prop('disabled', false);
        	}
        	
        	// bind lookup pin event
			$('#pin').bind({
				keyup: function(e){
					var charCode = (typeof e.which === "number") ? e.which : e.keyCode;
					if(charCode == 13){
						self.pinlookup($(this).val());
					}
				},
				focusout: function(){
					self.pinlookup($(this).val());
				}
			});
			
			$('#createBtn').on('click',function(){ return self.createAccount(); });
			$('#updateBtn').on('click',function(){ return self.updateAccount(); });
			
            return this;
        },
        
        updateUserInfo: function(callback){
        	var self = this;
        	// get form field values
			var user = new User();
			var props = {};
			$.each(user.attributes.properties,function(key,value){
				if(key=='birthdate'){
					props.birthdate = {
						year: self.$el.find('#year').val(),
						month: self.$el.find('#month').val(),
						day: self.$el.find('#day').val()
					};
				}
				else {
					props[key] = self.$el.find('#'+key).val();
				}
			});
			user.set('properties',props);
			user.update(function(success){
				if(success){
					callback();
				}
				else {
					var resp = JSON.parse(response.responseText);
    				Utils.alert(resp.message,null,'Error','Ok');
				}
			});
        },
        
        createAccount: function(){
        	
        	var hookOperators = function(){
        		var ready = true;
        		Operators.ActivatedOperators.each(function(operator){
        			if(operator.get('status')=='pending'){
        				ready = false;
        				return false;
        			}
        		});
        		if(ready){
        			$('#loader').hide();
        			$('#loader').text('Loading...');
        			window.location.href = "#operatorsList";
        		}
        	};
        	
        	this.updateUserInfo(function(){
        		var loadingTxt = $('#loader').text();
        		$('#loader').text('Stand by while we create your accounts...');
        		$('#loader').show();
        		
        		window.debugme = Operators.ActivatedOperators;
        		
        		// create accounts
        		Operators.ActivatedOperators.each(function(operator){
        			if(operator.get('status')=='pending'){
        				operator.createAccount({
	        				success: function(){
	        					console.log('account created successfully on ', operator.get('name'));
	        					operator.set('status','success');
	        					hookOperators();
	        				},
	        				error: function(){
	        					console.log('account not created on ', operator.get('name'));
	        					operator.set('status','error');
	        					hookOperators();
	        				}
	        			});
        			}
        		});
        	});
        	return false;
        },
        
        updateAccount: function(){
        	this.updateUserInfo(function(){
        		Utils.alert('User Info was updated!',function(){
        			window.location.href = "#mainMenuLogged";
        		},'Success','Ok');
        	});
        	return false;
        }
        
        
    });

    return View;
});