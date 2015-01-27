/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/ChangeUserEmail.html',
    'text!templates/snippets/EmailHeader.html',
    'models/user',
    'utils'
], function ($, _, Backbone, LoggedView, templateSrc, emailHeaderSrc, User, Utils) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.change-user-email',
        onRender: function(){
        	var self = this;
        	this.$el.prepend(_.template(emailHeaderSrc));
        	// bind events
        	$('#sendBtn').on('click',function(){
        		// verify if the registered email is correct
        		var regEmail = $('#registeredEmail').val();
        		if(regEmail != window.LoggedUser.get('properties').email){
        			Utils.alert('Registered ' + self.templateData.i18n.Emailaddress + ' is incorrect.',null,'Error','Ok');
        			return false;
        		}
        		// verify the new email is valid
        		var newEmail = $('#newEmail').val();
        		var success = Utils.validateEmail(newEmail);
        		if(!success){
        			Utils.alert('The New Email you entered is not a valid email address.',null,'Error','Ok');
        			return false;
        		}
        		// update the email and show msg confirmation to user (and go back to settings)
    			window.LoggedUser.get('properties').email = newEmail;
    			window.LoggedUser.update(function(ok){
    				if(ok){
    					Utils.alert('The New Email has been updated.',null,'Success','Ok');
    					window.history.back();
    				}
    				else {
    					Utils.alert('The New Email has not been updated.',null,'Error','Ok');
    				}
    			});
        		return false;
        	});
        	return this;
        }
    });

    return View;
});