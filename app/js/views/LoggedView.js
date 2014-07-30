/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/MainView'
], function ($, _, Backbone, MainView) {
    'use strict';

    var View = MainView.extend({
    	
        navbar: true,

		preRender: function(templateSrc) {
        	this.body.addClass('body-logged');
            this.body.removeClass('body-not-logged');
            // refactor into events object later
            $('.js-search').on('click', function() {
                window.location.href = '#eventsAllFilter';
            });
            this.onRender();
        },

        // Override this
        onInit: function() {},

        // Override this
        onRender: function() {}
    });

    return View;
});