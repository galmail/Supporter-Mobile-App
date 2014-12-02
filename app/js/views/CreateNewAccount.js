/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/CreateNewAccount.html',
    'views/global/UnloggedView',
    'collections/associations',
    'models/user',
    'utils'
], function ($, _, Backbone, templateSrc, UnloggedView, Associations, User, Utils) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.create-new-account',
        events: {
        	'click #createButton': 'createAccount'
        },
        
        createAccount: function(){
        	// validate email and password
        	var email = $('#email').val();
        	var password = $('#password').val();
        	if(email.length<1 || password.length<1) return false;
        	// create account
        	var user = new User({
        		properties: {
        			email: email,
        			association: Associations.selectedAssociation.id
        		}
        	});
        	user.signUp(password,function(success, response){
        		if(success){
        			window.location.href='#createNewAccountConfirmation';
        		}
        		else {
        			user.login(password,function(ok, resp){
        				if(ok){
        					window.location.href='#mainMenuLogged';
        				}
        				else {
        					var res = JSON.parse(resp.responseText);
        					Utils.alert(res.message,null,'Error','Ok');
        				}
        			});
        		}
        	});
        	return false;
        }
        
    });

    return View;
});