/*global define*/
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var View = Backbone.View.extend({

    	el: '#container',

    	body: $('body'),

    	template: null,

        navbar: true,

        events: {},

		initialize: function(templateSrc) {
        	this.body.addClass('body-logged');
            this.body.removeClass('body-not-logged');
            this.setNavBar();
            this.$el.html(this.template(templateSrc));
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