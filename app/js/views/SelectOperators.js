/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/SelectOperators.html',
    'text!templates/snippets/UnifiedRegistration.html'
], function ($, _, Backbone, templateSrc, unifiedRegistrationSrc) {
    'use strict';

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(templateSrc),

        events: {},

        initialize: function () {
            this.body = this.$el.parents('body');
            this.render();
        },

        render: function () {
            this.body.addClass('body-not-logged');
            this.$el.html(_.template(templateSrc));
            this.$el.prepend(_.template(unifiedRegistrationSrc, {
                step: 1,
                total: 3
            }));
        }
    });

    return View;
});