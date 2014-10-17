/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/snippets/Main.html'
], function ($, _, Backbone, mainTpl) {
    'use strict';
    
    _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

    var View = Backbone.View.extend({
    	
    	el: '#container',

        // Override this
        template: null,

        initialize: function (templateSrc) {
        	console.log('MainView initialize');
            $('body').html(_.template(mainTpl));
            this.loadIOvationScript();
        },
        
        loadIOvationScript: function(){
        	window.io_operation = 'ioBegin';
            window.io_bbout_element_id = 'iovationtoken';
            window.io_install_flash = false;
            window.io_install_stm = false;
        	$.getScript("https://ci-mpsnare.iovation.com/snare.js",function(){
        		//console.log($('#iovationtoken').val());
        		console.log('iovation token loaded');
        	});
        },
        
        renderCollection: function(collection, resultsElement, elementTemplate){
            if(collection!=null){
            	resultsElement.empty();
	            for (var i = 0; i < collection.length; i++) {
	                var model = collection.at(i);
	                var compiled = _.template(elementTemplate);
	                var result = compiled(model.attributes);
	                resultsElement.append($(result));
	            }
            }
        }
        
    });

    return View;
});