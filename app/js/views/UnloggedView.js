/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/snippets/UnifiedRegistration.html'
], function ($, _, Backbone, unifiedRegistrationSrc) {
    'use strict';

    var View = Backbone.View.extend({

    	container: '#container',

    	body: $('body'),

    	template: null,
    	
    	templateData: null,

    	navbar: false,

        unifiedRegStep: null,

        events: {},

        initialize: function () {
        	//console.log("UnloggedView initialize");
			this.body.addClass('body-not-logged');
            this.body.removeClass('body-logged');
            this.setNavBar();
            
            $(container).html(this.template(this.templateData));
            this.fixContainerHeight();

            if (this.unifiedRegStep !== null) {
                $(container).prepend(_.template(unifiedRegistrationSrc, {
                    step: this.unifiedRegStep,
                    total: 3
                }));
            }

            this.el = $(this.element);
        	this._ensureElement();

            this.onRender();
            this.onInit();
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