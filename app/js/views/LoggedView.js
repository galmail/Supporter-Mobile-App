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

            // refactor into events object later
            $('.search-icon').on('click', function() {
                window.location.href = '#eventsAllFilter';
            });
            this.onRender();
        },

        setNavBar: function(){
        	var $navbar = $('.js-navbar nav.tab-bar');
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