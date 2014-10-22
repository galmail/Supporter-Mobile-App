/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/CreateNewAccount.html',
    'views/global/UnloggedView',
    'collections/associations',
    'models/user'
], function ($, _, Backbone, templateSrc, UnloggedView, Associations, User) {
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
        	var user = new User(email,Associations.selectedAssociation.id);
        	user.signUp(password,function(result){
        		// go to next screen
        		window.location.href='#selectOperators';
        	});
        	return false;
        }
        
        
        
    });

    return View;
});