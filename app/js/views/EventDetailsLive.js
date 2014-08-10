/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/EventDetailsLive.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        events: {
            'click .js-accordion-header':   'toggleAccordion',
            'click .js-inner-header':       'toggleInnerAccordion'
        },

        toggleAccordion: function (e) {
            var currentTarget = $(e.currentTarget);
            var target = $(e.target);
            e.stopPropagation();
            currentTarget.closest('.js-accordion-block').find('.js-content').slideToggle();
        },

        toggleInnerAccordion: function (e) {
            var currentTarget = $(e.currentTarget);
            var target = $(e.target);
            e.stopPropagation();
            currentTarget.closest('.js-inner-block').find('.js-inner-content').slideToggle();
        }
    });

    return View;
});