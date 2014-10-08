/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/SignIn.html',
    'views/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.sign-in',
        
        events: {
        	//'click #login-btn' : 'login'
        },
        
        login: function(){
        	var data = {email: 'm@0g.se', password: '123'};
        	$.post(window.serverURL + '/io/services/OpenUserService/openUserService/userAuthentication.json',data,function(res,status,xhr){
        		var cookie = xhr.getResponseHeader('Set-Cookie');
        	});
        }
        
    });

    return View;
});