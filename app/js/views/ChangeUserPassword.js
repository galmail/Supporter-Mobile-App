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
        onRender: function() {
        	this.$el.prepend(_.template(emailHeaderSrc));
        	// bind events
        	$('#sendBtn').on('click',function(){
        		// verify if the old password is correct
        		var oldPaswd = $('#oldPaswd').val();
        		User.LoggedUser.login(oldPaswd,function(ok){
        			if(!ok){
        				Utils.alert('Current Password is incorrect.',null,'Error','Ok');
        				return false;
        			}
        			// verify the new password has been confirmed
        			var newPaswd = $('#newPaswd').val();
        			var newPaswdConfirm = $('#newPaswdConfirm').val();
        			if(newPaswd.length===0 || newPaswd != newPaswdConfirm){
        				Utils.alert('Please make sure you confirm the new password.',null,'Error','Ok');
        				return false;
        			}
        			// update the password and show msg confirmation to user (and go back to settings)
        			User.LoggedUser.updatePassword(newPaswd,function(ok){
	    				if(ok){
	    					Utils.alert('The New Password has been updated.',null,'Success','Ok');
	    					window.history.back();
	    				}
	    				else {
	    					Utils.alert('The New Password has not been updated.',null,'Error','Ok');
	    				}
    				});
        		});
        		return false;
        	});
        	return this;
        }
    });

    return View;
});