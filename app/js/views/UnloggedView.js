/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/snippets/UnifiedRegistration.html'
], function ($, _, Backbone, unifiedRegistrationSrc) {
    'use strict';

    var View = Backbone.View.extend({

        unifiedRegStep: null,

        el: '#container',

        // Override this
        template: null,

        // Override this
        events: {
        },

        initialize: function (templateSrc) {
            $('.js-navbar').hide();
            this.body = this.$el.parents('body');
            this.render(templateSrc);

            this.onInit();
        },

        render: function (templateSrc) {
            this.body.addClass('body-not-logged');
            this.body.removeClass('body-logged');
            this.$el.html(this.template(templateSrc));

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