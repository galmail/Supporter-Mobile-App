/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/ChangeUserPassword.html',
    'text!templates/snippets/EmailHeader.html',
    'models/user',
    'utils',
    'models/i18n'    
], function ($, _, Backbone, LoggedView, templateSrc, emailHeaderSrc, User, Utils, I18n) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.change-user-password',
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
        onRender: function(callback) {
	        var self = this;
        	this.$el.prepend(_.template(emailHeaderSrc));
        	// bind events
        	$('#sendBtn').on('click',function(){
        		// verify if the old password is correct
        		var oldPaswd = $('#oldPaswd').val();
        		window.LoggedUser.login(oldPaswd,function(ok){
        			if(!ok){
        				Utils.alert(self.templateData.i18n.incorrectpassword_txt,null,self.templateData.i18n.Error,self.templateData.i18n.Ok);
        				return false;
        			}
        			// verify the new password has been confirmed
        			var newPaswd = $('#newPaswd').val();
        			var newPaswdConfirm = $('#newPaswdConfirm').val();
        			if(newPaswd.length===0 || newPaswd != newPaswdConfirm){
        				Utils.alert(self.templateData.i18n.confirmnewpassword_txt,null,self.templateData.i18n.Error,self.templateData.i18n.Ok);
        				return false;
        			}
        			// update the password and show msg confirmation to user (and go back to settings)
        			window.LoggedUser.updatePassword(newPaswd,function(ok){
	    				if(ok){
	    					Utils.alert(self.templateData.i18n.passwordupdated_txt,null,self.templateData.i18n.Success,self.templateData.i18n.Ok);
	    					window.history.back();
	    				}
	    				else {
	    					Utils.alert(self.templateData.i18n.passwordnotupdated_txt,null,self.templateData.i18n.Error,self.templateData.i18n.Ok);
	    				}
    				});
        		});
        		return false;
        	});
        	callback();
        }
    });

    return View;
});