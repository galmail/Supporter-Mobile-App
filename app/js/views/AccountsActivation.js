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
            $('.tandc').on('click', function(){
	        	Operators.SelectedOperator = self.collection.get(this.parentElement.parentElement.id).attributes;
	        	Operators.SelectedOperator.showCreateAccountBtn = '';
	        	window.location.href = "#operatorTerms";
            });
            
            // bind activate accounts event
            $('#activateButton').on('click', function(){
            	$('.switch input').each(function(op,chk){
	        		var myOperator = self.collection.get($(chk).data().id);
	        		if(chk.checked){
	        			myOperator.createAccount({
	        				success: function(){
	        					console.log('account created successfully');
	        					myOperator.set('status','success');
	        					Operators.ActivatedOperators.add(myOperator);
	        				},
	        				error: function(){
	        					console.log('account not created');
	        					myOperator.set('status','error');
	        					Operators.ActivatedOperators.add(myOperator);
	        				}
	        			});
	        		}
	        		else {
	        			console.log('account not selected');
	        			Operators.ActivatedOperators.add(myOperator);
	        		}
	        	});
	        	return true;
            });
            return this;
        }
        
    });

    return View;
});