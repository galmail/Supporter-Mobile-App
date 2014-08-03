/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/snippets/Main.html'
], function ($, _, Backbone, mainTpl) {
    'use strict';

    var View = Backbone.View.extend({
    	
    	el: '#container',

        // Override this
        template: null,

        initialize: function (templateSrc) {
        	console.log("MainView initialize");
            $('body').html(_.template(mainTpl));
            this.loadIOvationScript();
        },
        
        loadIOvationScript: function(){
        	window.io_operation = 'ioBegin';
            window.io_bbout_element_id = 'iovationtoken';
            window.io_install_flash = false;
            window.io_install_stm = false;
        	$.getScript("https://ci-mpsnare.iovation.com/snare.js",function(){
        		console.log($('#iovationtoken').val());
        	});
        }
        
    });

    return View;
});