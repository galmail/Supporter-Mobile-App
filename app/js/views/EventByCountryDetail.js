/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/EventByCountryDetail.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.event-by-country-detail',
        events:{
        	'click .event-div-closed': 					'toggleEventDetail',
        	//'click .event .bet-type': 				'betTypeClicked',
        	'click .event .bet-type':   				'openBetProcess',
        	'click #betProcessModal .closeButton': 		'closeBetProcess',
        	'click #betProcessModal .placeBetButton': 	'placeBetProcess'
        },
        toggleEventDetail: function(el){
        	//console.log('toggleEventDetail');
        	el.stopPropagation();
        	var target = $(el.currentTarget);
        	target.find('.bet-type').toggle();
        	target.find('.teams').toggleClass('small-6').toggleClass('small-12');
        	target.find('.teams').toggleClass('team-title');
        	target.next().slideToggle();
        	return false;
        },
        betTypeClicked: function(el){
        	//console.log('betTypeClicked');
        	el.stopPropagation();
        	window.location.href = '#betOpenProcess';
        	return false;
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