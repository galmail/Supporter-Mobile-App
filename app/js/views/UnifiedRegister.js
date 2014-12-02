/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/UnifiedRegister.html',
    'views/global/UnloggedView',
    'models/user',
    'utils'
], function ($, _, Backbone, templateSrc, UnloggedView, User, Utils) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.unified-register',
       	
       	pinlookup: function(pin){
       		var self = this;
       		User.LoggedUser.pinLookUp(pin,function(success, model, response){
       			if(success){
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
       			}
       			else {
       				var resp = JSON.parse(response.responseText);
        			Utils.alert(resp.message,null,'PIN LookUp','Ok');
       			}
       		});
       	},
        
        onRender: function(){
            var self = this;
            if(User.LoggedUser.get('properties').firstName){
        		$('#createBtn').hide();
        		$('#updateBtn').show();
        		$('#cancelBtn').attr('href','#userSettings');
        		if(User.LoggedUser.get('properties').pin){
        			$('#pin').prop('disabled', true);
        			self.pinlookup(User.LoggedUser.get('properties').pin);
        		}
        		else {
        			$('#pin').prop('disabled', false);
        		}
        	}
        	else {
        		$('#createBtn').show();
        		$('#updateBtn').hide();
        		$('#cancelBtn').attr('href','javascript:window.history.back();');
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
			
			$('#createBtn').on('click',function(){ self.createAccount(); });
			$('#updateBtn').on('click',function(){ self.updateAccount(); });
			
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
        	this.updateUserInfo(function(){
        		window.location.href = "#operatorsList";
        	});
        	return false;
        },
        
        updateAccount: function(){
        	this.updateUserInfo(function(){
        		Utils.alert('User Info was updated!',function(){
        			window.location.href = "#userSettings";
        		},'Success','Ok');
        	});
        	return false;
        }
        
        
    });

    return View;
});