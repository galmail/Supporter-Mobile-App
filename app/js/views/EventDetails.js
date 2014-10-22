/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/EventDetails.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.event-details',
        events: {
            'click .js-accordion-header':   			'toggleAccordion',
        	'click .numeric':   						'openBetProcess',
        	'click #betProcessModal .closeButton': 		'closeBetProcess',
        	'click #betProcessModal .placeBetButton': 	'placeBetProcess'
        },

        toggleAccordion: function (e) {
            var currentTarget = $(e.currentTarget);
            var target = $(e.target);
            console.info('target', target);
            console.info('currentTarget', currentTarget);
            e.stopPropagation();
            currentTarget.closest('.js-accordion-block').find('.js-content').slideToggle();
        },
        
        openBetProcess: function(){
        	//console.log('open bet process modal');
        	$('.betslip').show();
    		$('.betslipPlaced').hide();
        	$('#betProcessModal').show();
    		$('.modal-bg').show();
    		return false;
        },
        
        closeBetProcess: function(){
        	//console.log('close bet process modal');
        	$('#betProcessModal').hide();
    		$('.modal-bg').hide();
    		return false;
        },
        
        placeBetProcess: function(){
        	//console.log('place bet process modal');
        	$('.betslip').hide();
    		$('.betslipPlaced').show();
    		return false;
        }
        
    });

    return View;
});