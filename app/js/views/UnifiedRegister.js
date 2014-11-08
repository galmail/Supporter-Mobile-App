/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/UnifiedRegister.html',
    'views/global/UnloggedView',
    'models/user'
], function ($, _, Backbone, templateSrc, UnloggedView, User) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.unified-register',
        //unifiedRegStep: 2,
       	
       	pinlookup: function(pin){
       		var self = this;
       		User.LoggedUser.pinLookUp(pin,function(success, model, response){
       			if(success){
       				// fill data
       				$.each(model.attributes.properties,function(key,value){
       					self.$el.find('#'+key).val(value);
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
			// bind create button event
			$('#createButton').on('click',function(){
				// get form field values
				var user = new User();
				var props = {};
				$.each(user.attributes.properties,function(key,value){
					props[key] = self.$el.find('#'+key).val();
				});
				user.set('properties',props);
				user.update(function(success){
					if(success){
						window.location.href = "#accountsActivation";
					}
					else {
						var resp = JSON.parse(response.responseText);
        				Utils.alert(resp.message,null,'Error','Ok');
					}
				});
				return false;
			});
			
			
            return this;
        }
        
        
        
    });

    return View;
});