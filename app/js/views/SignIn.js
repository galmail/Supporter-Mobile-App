/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/SignIn.html',
    'views/global/UnloggedView',
    'models/user'
], function ($, _, Backbone, templateSrc, UnloggedView, User) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.sign-in',
        
        events: {
        	'click #login-btn' : 'login'
        },
        
        login: function(){
        	var email = $('#email').val();
        	var password = $('#password').val();
        	var user = new User(email);
        	user.login(password,function(success){
        		if(success){
        			console.log('logged in successful!');
        			window.location.href = "#selectOperators";
        		}
        	});
        	return false;
        }
        
        /*
        login: function(){
        	var data = {email: 'm@0g.se', password: '123'};
        	$.post(window.serverURL + '/io/services/OpenUserService/openUserService/userAuthentication.json',data,function(res,status,xhr){
        		var cookie = xhr.getResponseHeader('Set-Cookie');
        	});
        }
        */
        
    });

    return View;
});