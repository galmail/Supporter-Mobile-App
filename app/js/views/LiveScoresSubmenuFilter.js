/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/LiveScoresSubmenuFilter.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.live-scores-submenu-filter',
        events: {
        	'click .event .bet-type': 'betTypeClicked'
        },
        betTypeClicked: function(){
        	window.location.href = '#eventDetailsLive';
        }
    });

    return View;
});