/*global define*/
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';
    
    _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };

    var View = Backbone.View.extend({

    	container: '#container',

    	body: $('body'),

    	template: null,
    	
    	templateData: null,

        navbar: true,

        events: {},

		initialize: function() {
			//console.log('LoggedView initialize');
        	this.body.addClass('body-logged');
            this.body.removeClass('body-not-logged');
            this.setNavBar();
            $(container).html(this.template(this.templateData));
            this.fixContainerHeight();
            

            // refactor into events object later
            $('.search-icon').on('click', function() {
                window.location.href = '#eventsAllFilter';
            });
            $('.back-icon').on('click', function() {
                window.history.back();
            });
            $('.home-icon').on('click', function() {
                window.location.href = '#mainMenuLogged';
            });
            $('.options-icon').on('click', function() {
                window.location.href = '#userSettings';
            });
            
            this.el = $(this.element);
        	this._ensureElement();

            this.onRender();
        },

        setNavBar: function(){
        	var $navbar = $('#header');
        	var $footer = $('#footer');
        	if (this.navbar) {
                $navbar.show();
                $footer.show();
            }
            else {
                $navbar.hide();
                $footer.hide();
            }
        },
        
        fixContainerHeight: function(){
        	var device_height = $(window).height();
        	var header_height = 0;
        	var footer_height = 0;
        	if($('#header').is(':visible')){
        		header_height = $('#header').height();
        	}
        	if($('#footer').is(':visible')){
        		footer_height = $('#footer').height();
        	}
        	$('#container').height(device_height-(header_height+footer_height));
        },

        // Override this
        onInit: function() {},

        // Override this
        onRender: function() {}
    });

    return View;
});