/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/MainMenuLogged.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({

        template: _.template(templateSrc),
        
        element: '.main-menu-logged',

        events: {
            'click li.js-menu-item': 'goToBetting'
        },

        onRender: function () {
            this.body.addClass('body-not-logged');
        },

        goToBetting: function () {
            window.location.href = '#eventsAllFilter';
        }

    });

    return View;
});