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
        
        events: {
        	'click #login-btn' : 'login'
        },
        
        login: function(){
        	this.loadIOvationScript();
        	
        	
        	// var data = {email: 'm@0g.se', password: '123'};
        	// $.post('http://suppdev01.cloudapp.net/io/services/OpenUserService/openUserService/userAuthentication.json',data,function(res){
        		// console.log(res);
        	// });
        },
        
        
        loadIOvationScript: function(){
        	window.io_operation = 'ioBegin';
            window.io_bbout_element_id = 'iovationtoken';
            window.io_install_flash = false;
            window.io_install_stm = false;
        	
        	$.getScript( "https://ci-mpsnare.iovation.com/snare.js", function( data, textStatus, jqxhr ) {
			  console.log( data ); // Data returned
			  console.log( textStatus ); // Success
			  console.log( jqxhr.status ); // 200
			  console.log( "iovation=" + $('#iovationtoken').val() );
			});
        }
        
        
    });

    return View;
});