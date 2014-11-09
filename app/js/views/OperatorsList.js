/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/OperatorsList.html',
    'text!templates/snippets/OperatorsListElement.html',
    'collections/operators'
], function ($, _, Backbone, LoggedView, templateSrc, OperatorsListElement, Operators) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.operators-list',
        collection: Operators.ActivatedOperators,
        
        // onInit: function(callback){
        	// //this.collection = ;
        	// callback();
        	// // var self = this;
        	// // self.collection.getAvailable(function(availableOperators){
        		// // console.log('loaded operators operatorsList');
        		// // callback();
        	// // });
        // },
        
        onRender: function() {
            var self = this;
        	var results = this.$el.find('#operatorsList');
        	// set icons
        	for(var i=0;i<this.collection.length;i++){
        		var model = this.collection.at(i);
        		if(model.get('status')=='pending'){
        			model.set('statusIcon','fa-circle-o');
        		}
        		else if(model.get('status')=='success'){
        			model.set('statusIcon','fa-check');
        		}
        		if(model.get('status')=='error'){
        			model.set('statusIcon','fa-close');
        		}
        	}
            this.renderCollection(this.collection, results, OperatorsListElement);
            // bind operators terms event
            $('.operator-data').on('click', function(){
	        	Operators.SelectedOperator = self.collection.get(this.parentElement.id).attributes;
	        	if(Operators.SelectedOperator.status=='pending'){
	        		Operators.SelectedOperator.showCreateAccountBtn = 'display:block;';
	        		window.location.href = "#operatorTerms";
	        	}
	        	else if(Operators.SelectedOperator.status=='error'){
	        		window.location.href = "#operatorConnect";
	        	}
	        	return false;
            });
            return this;
        }
    });

    return View;
});