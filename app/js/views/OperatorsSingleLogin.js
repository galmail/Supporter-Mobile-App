/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/OperatorsSingleLogin.html',
    'views/UnloggedView',
    'text!templates/snippets/UnifiedRegistration.html'
], function ($, _, Backbone, templateSrc, UnloggedView, unifiedRegistrationSrc) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        unifiedRegStep: 3,

        events: {
            'click .js-accordion-header':   'toggleAccordion'
        },

        toggleAccordion: function (e) {
            var currentTarget = $(e.currentTarget);
            var target = $(e.target);
            e.stopPropagation();
            currentTarget.closest('.js-accordion-block').find('.js-content').slideToggle();
        }
    });

    return View;
});
