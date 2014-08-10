/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/EventDetails.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        events: {
            'click .js-accordion-header':   'toggleAccordion'
        },

        toggleAccordion: function (e) {
            var currentTarget = $(e.currentTarget);
            var target = $(e.target);
            console.info('target', target);
            console.info('currentTarget', currentTarget);
            e.stopPropagation();
            currentTarget.closest('.js-accordion-block').find('.js-content').slideToggle();
        }
    });

    return View;
});