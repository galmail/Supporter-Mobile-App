/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
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

        goToBetting: function(el) {
            window.location.href = '#' + el.currentTarget.id;
        }

    });

    return View;
});