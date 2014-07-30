/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/snippets/UnifiedRegistration.html'
], function ($, _, Backbone, unifiedRegistrationSrc) {
    'use strict';

    var View = Backbone.View.extend({
    	
    	el: '#container',
    	
    	body: $('body'),
    	
    	template: null,
    	
    	navbar: false,

        unifiedRegStep: null,
        
        events: {},

        initialize: function (templateSrc) {
        	console.log("UnloggedView initialize");
			this.body.addClass('body-not-logged');
            this.body.removeClass('body-logged');
            this.setNavBar();
            this.$el.html(this.template(templateSrc));
            if (this.unifiedRegStep !== null) {
                this.$el.prepend(_.template(unifiedRegistrationSrc, {
                    step: this.unifiedRegStep,
                    total: 3
                }));
            }
            this.onRender();
        },
        
        setNavBar: function(){
        	var $navbar = $('.js-navbar nav.top-bar');
        	if (this.navbar) {
                $navbar.show();
            }
            else {
                $navbar.hide();
            }
        },

        // Override this
        onInit: function() {},

        // Override this
        onRender: function() {}
    });

    return View;
});