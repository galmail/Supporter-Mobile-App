/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/AccountsActivation.html',
    'views/global/UnloggedView',
    'collections/operators',
    'models/operator',
    'models/user',
    'text!templates/snippets/AccountsActivationElement.html',
], function ($, _, Backbone, templateSrc, UnloggedView, Operators, Operator, User, AccountsActivationElement) {
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
        	if(self.collection.size()==0){
        		// get available operators
	        	self.collection.getAvailable(function(availableOperators){
	        		console.log('loaded operators accountsActivation');
	        		self.collection.each(function(op){ op.set('activate','checked'); });
	        		Operators.ActivatedOperators = availableOperators;
	        		callback();
	        	});
        	}
        	else {
        		callback();
        	}
        },
        
        onRender: function(callback) {
        	var self = this;
        	var results = this.$el.find('#operatorsList');
            this.renderCollection(this.collection, results, AccountsActivationElement);
            
            // bind operators terms event
            $('.tandc').on('click', function(){
	        	Operators.SelectedOperator = self.collection.get(this.parentElement.parentElement.id).attributes;
	        	Operators.SelectedOperator.showCreateAccountBtn = '';
	        	window.location.href = "#operatorTerms";
            });
            
            self.$el.find('input[type=checkbox]').on('change', function(){
            	var op = self.collection.get(this.dataset.id);
            	if(this.checked){
            		op.set('activate','checked');
            	}
            	else {
            		op.set('activate','');
            	}
            });
            
            // bind activate accounts event
            $('#activateButton').on('click', function(){
            	$('.switch input').each(function(op,chk){
	        		var myOperator = self.collection.get($(chk).data().id);
	        		if(chk.checked){
	        			myOperator.set('status','pending');
	        		}
	        		Operators.ActivatedOperators.add(myOperator);
	        	});
	        	return true;
            });
            callback();
        }
        
    });

    return View;
});