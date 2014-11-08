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
        collection: new Operators(),
        
        onInit: function(callback){
        	var self = this;
        	// get available operators
        	self.collection.getAvailable(function(availableOperators){
        		console.log('loaded operators operatorsList');
        		callback();
        	});
        },
        
        onRender: function() {
            var self = this;
        	var results = this.$el.find('#operatorsList');
            this.renderCollection(this.collection, results, OperatorsListElement);
            // bind operators terms event
            $('.operator-data').on('click', function(){
	        	Operators.SelectedOperator = self.collection.get(this.parentElement.id).attributes;
	        	Operators.SelectedOperator.showCreateAccountBtn = 'display:block;';
	        	window.location.href = "#operatorTerms";
            });
            return this;
        }
    });

    return View;
});