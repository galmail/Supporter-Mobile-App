/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/SignIn.html',
    'views/global/UnloggedView',
    'models/user',
    'utils'
], function ($, _, Backbone, templateSrc, UnloggedView, User, Utils) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.sign-in',
        
        onRender: function(){
        	var self = this;
        	$('#login-btn').on('click',self.login);
        	return this;
        },
        
        login: function(){
        	var email = $('#email').val();
        	var password = $('#password').val();
        	var user = new User({
        		properties: { email: email }
        	});
        	user.login(password,function(success, response){
        		if(success){
        			window.location.href = "#mainMenuLogged";
        		}
        		else {
        			var resp = JSON.parse(response.responseText);
        			Utils.alert(resp.message,null,'Error','Ok');
        		}
        	});
        	return false;
        }
        
    });

    return View;
});