/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/UnifiedLogin.html'
], function ($, _, Backbone, templateSrc) {
    'use strict';

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(templateSrc),

        events: {
            'keyup .js-ssn': 'onSsn',
        },

        initialize: function () {
            this.body = this.$el.parents('body');
            this.render();
        },

        render: function () {
            this.body.addClass('body-not-logged');
            this.$el.html(_.template(templateSrc));
        },
        onSsn: function () {
            // fill out the form
        }
    });

    return View;
});