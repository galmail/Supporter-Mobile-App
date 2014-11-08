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
        		association: Associations.selectedAssociation.id,
        		properties: { email: email }
        	});
        	user.signUp(password,function(success, response){
        		if(success){
        			window.location.href='#unifiedRegister';
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