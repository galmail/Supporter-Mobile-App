/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/OperatorsSingleLogin.html'
], function ($, _, Backbone, templateSrc) {
    'use strict';

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(templateSrc),

        events: {
            'click .js-accordion-header':   'toggleAccordion'
        },

        initialize: function () {
            this.body = this.$el.parents('body');
            this.render();
        },

        render: function () {
            this.body.addClass('body-not-logged');
            this.$el.html(_.template(templateSrc));
        },

        toggleAccordion: function (e) {

            var target = $(e.currentTarget);
            target.find('.js-content').slideToggle();
            console.info('target', target.find('.js-content'));

        }
    });

    return View;
});