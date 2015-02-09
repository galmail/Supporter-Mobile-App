/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/ChangeUserPassword.html',
    'text!templates/snippets/EmailHeader.html',
    'models/user',
    'utils'
], function ($, _, Backbone, LoggedView, templateSrc, emailHeaderSrc, User, Utils) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.change-user-password',
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