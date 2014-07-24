/*global define*/
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var View = Backbone.View.extend({

        el: '#container',

        // Override this
        template: null,

        // Override this
        events: {
        },

        initialize: function (templateSrc) {
            $('.js-navbar').show();
            this.body = this.$el.parents('body');
            this.render(templateSrc);

            this.onInit();
        },

        render: function (templateSrc) {
            this.$el.html(this.template(templateSrc));
            this.body.addClass('body-logged');
            this.onRender();
        },

        // Override this
        onInit: function() {},

        // Override this
        onRender: function() {}
    });

    return View;
});