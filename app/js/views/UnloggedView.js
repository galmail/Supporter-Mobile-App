/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/MainView',
    'text!templates/snippets/UnifiedRegistration.html'
], function ($, _, Backbone, MainView, unifiedRegistrationSrc) {
    'use strict';

    var View = MainView.extend({
    	
    	navbar: false,

        unifiedRegStep: null,

        preRender: function (templateSrc) {
			this.body.addClass('body-not-logged');
            this.body.removeClass('body-logged');
            if (this.unifiedRegStep !== null) {
                this.$el.prepend(_.template(unifiedRegistrationSrc, {
                    step: this.unifiedRegStep,
                    total: 3
                }));
            }
            this.onRender();
        },

        // Override this
        onInit: function() {},

        // Override this
        onRender: function() {}
    });

    return View;
});