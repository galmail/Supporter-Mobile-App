/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/ByCountrySubmenuFilter.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.by-country-submenu-filter',
        events: {
        	'click .event .bet-type': 'betTypeClicked'
        },
        betTypeClicked: function(){
        	window.location.href = '#eventByCountryDetail';
        }
    });

    return View;
});