/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/MostPlayedSubmenuFilter.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        events: {
        	'click .event .bet-type': 'betTypeClicked'
        },
        betTypeClicked: function(){
        	window.location.href = '#eventDetails';
        }
    });

    return View;
});