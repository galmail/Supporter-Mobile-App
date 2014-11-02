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
        collection: null,
        
        // events: {
            // 'click .js-select-operator': 'selectOperator',
            // 'click #activateButton': 'createAccounts'
        // },
        
        onInit: function(callback){
        	var self = this;
        	// get available operators
        	new Operators().getAvailable(function(availableOperators){
        		self.collection = availableOperators;
        		callback();
        	});
        },
        
        onRender: function() {
        	var results = this.$el.find('#operatorsList');
            this.renderCollection(this.collection, results, AccountsActivationElement);
            
            // bind events
            $('.operator').on('click', this.showOperatorTC);
            $('#activateButton').on('click', this.createAccounts);
            
            
            return this;
        },
        
        selectOperator: function(){
        	return false;
        },
        
        createAccounts: function(){
        	var self = this;
        	$('.switch input').each(function(op,chk){
        		if(chk.checked){
        			var operator = new Operator({
        				name: $(chk).data().name,
        				key: $(chk).data().id
        			});
        			operator.createAccount();
        		}
        	});
        	return true;
        },
        
        showOperatorTC: function(event){
        	// get selected operator
        	Operators.SelectedOperator = this.collection.get(event.currentTarget.id);
        	window.location.href = "#operatorTerms";
        }
        
    });

    return View;
});