/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/UnifiedRegister.html',
    'views/global/UnloggedView',
    'models/user',
    'collections/operators',
    'utils',
    'models/i18n'        
], function ($, _, Backbone, templateSrc, UnloggedView, User, Operators, Utils, I18n) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.unified-register',
 //Add translation
        initialize: function () {
        	var self = this;
            this.onInit(function(){
            	// before render, add to templateData the language translation
            	if(I18n.transData!==null){
            		self.templateData.i18n = I18n.transData;
            		self.render();
            	}
            	else {
            		new I18n({code: I18n.locale}).load(function(model){
            			I18n.transData = model.attributes;
            			self.templateData.i18n = I18n.transData;
	            		self.render();
            		});

            	}
            });
        },        
        //End translation
       	
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
        			Utils.alert(resp.message,null,'PIN LookUp',self.templateData.i18n.Ok);
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
        
        onRender: function(callback){
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

          // manage focus on input ids
          self.$el.find('input').on('click',function(){
            console.log('input on click: ' + this.id);
            var jInput = $(this);
            if(jInput.prev().prop("tagName")=='INPUT'){
              jInput.prev().trigger('focus');
              setTimeout(function(){
              	jInput.trigger('focus');
              }, 300);
            }
          });

        	
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
			
          callback();
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
    				Utils.alert(resp.message,null,self.templateData.i18n.Error,self.templateData.i18n.Ok);
				}
			});
        },
        
        createAccount: function(){
        		        	var self = this; 

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
        			$('#loader').text(self.templateData.i18n.Loading);
        			window.location.href = "#operatorsList";
        		}
        	};
        	
        	this.updateUserInfo(function(){
        		var loadingTxt = $('#loader').text();
        		$('#loader').text(self.templateData.i18n.StandByWhileWeCreate);
        		$('#loader').show();
        		
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
	        var self = this;
        	this.updateUserInfo(function(){
        		Utils.alert(self.templateData.i18n.UserInfoWasUpdated,function(){
        			window.location.href = "#mainMenuLogged";
        		},self.templateData.i18n.Success,self.templateData.i18n.Ok);
        	});
        	return false;
        }
        
        
    });

    return View;
});