/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/OperatorsList.html',
    'text!templates/snippets/OperatorsListElement.html',
    'collections/operators',
    'utils'
], function ($, _, Backbone, LoggedView, templateSrc, OperatorsListElement, Operators, Utils) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.operators-list',
        
        onInit: function(callback){
        	var self = this;
        	Operators.getActiveOperators(function(operators){
        		self.collection = operators;
        		callback();
        	});
        	this.templateData.showBackButton = 'block';
        	if(window.showBackButton=='hidebackbutton'){
        		this.templateData.showBackButton = 'none';
        	}
        },
        
        onRender: function(callback) {
	        var self = this;
	    	var results = this.$el.find('#operatorsList');
	    	// set icons
	    	for(var i=0;i<this.collection.length;i++){
	    		var model = this.collection.at(i);
	    		model.set('statusIcon',model.getStatusIcon());
	    	}
	        this.renderCollection(this.collection, results, OperatorsListElement);
	        // bind operators terms event
	        $('.operator-data').on('click', function(){
	        	Operators.SelectedOperator = self.collection.get(this.parentElement.id).attributes;
	        	window.location.href = "#operatorConnect";
	        	
	        	// if(Operators.SelectedOperator.status=='not-selected'){
	        		// Operators.SelectedOperator.showCreateAccountBtn = 'display:block;';
	        		// window.location.href = "#operatorTerms";
	        	// }
	        	// else if(Operators.SelectedOperator.status=='error'){
	        		// window.location.href = "#operatorConnect";
	        	// }
	        	
	        	return false;
	        });
	        callback();
        }
    });

    return View;
});