/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/EventByCountryDetail.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.event-by-country-detail',
        events:{
        	'click .event-div-closed': 'toggleEventDetail',
        	'click .event .bet-type': 'betTypeClicked'
        },
        toggleEventDetail: function(el){
        	console.log('toggleEventDetail');
        	el.stopPropagation();
        	var target = $(el.currentTarget);
        	target.find('.bet-type').toggle();
        	target.find('.teams').toggleClass('small-6').toggleClass('small-12');
        	target.find('.teams').toggleClass('team-title');
        	target.next().slideToggle();
        	return false;
        },
        betTypeClicked: function(el){
        	console.log('betTypeClicked');
        	el.stopPropagation();
        	window.location.href = '#betOpenProcess';
        	return false;
        }
    });

    return View;
});