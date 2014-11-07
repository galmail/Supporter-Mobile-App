/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/AccountsActivation.html',
    'views/global/UnloggedView',
    'collections/operators',
    'models/operator',
    'text!templates/snippets/AccountsActivationElement.html',
], function ($, _, Backbone, templateSrc, UnloggedView, Operators, Operator, AccountsActivationElement) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.accounts-activation',
        collection: new Operators(),
        
        // events: {
            // 'click .js-select-operator': 'selectOperator',
            // 'click #activateButton': 'createAccounts'
        // },
        
        onInit: function(callback){
        	var self = this;
        	console.log('onInit accountsActivation');
        	// get available operators
        	self.collection.getAvailable(function(availableOperators){
        		console.log('loaded operators accountsActivation');
        		//self.collection = availableOperators;
        		callback();
        	});
        },
        
        onRender: function() {
        	var self = this;
        	var results = this.$el.find('#operatorsList');
            this.renderCollection(this.collection, results, AccountsActivationElement);
            
            // bind operators terms event
            $('.operator-data').on('click', function(){
	        	Operators.SelectedOperator = self.collection.get(this.parentElement.id).attributes;
	        	window.location.href = "#operatorTerms";
            });
            // bind activate accounts event
            $('#activateButton').on('click', function(){
	        	$('.switch input').each(function(op,chk){
	        		if(chk.checked){
	        			//var operator = self.collection.get($(chk).data().id);
	        			var operator = new Operator({
	        				name: $(chk).data().name,
	        				key: localStorage.key
	        			});
	        			operator.createAccount();
	        		}
	        	});
	        	return true;
            });
            return this;
        }
        
    });

    return View;
});