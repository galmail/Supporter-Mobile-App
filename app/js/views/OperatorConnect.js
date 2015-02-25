/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/OperatorConnect.html',
    'collections/operators',
    'models/operator',
    'models/user',
    'utils'
], function ($, _, Backbone, LoggedView, templateSrc, Operators, Operator, User, Utils) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.operator-connect',
        
        onInit: function(callback){
        	this.templateData = Operators.SelectedOperator;
        	var firstParagraph = null;
        	var secondParagraph = null;
        	var showCreateAccountBtn = 'display:none;';
        	switch(Operators.SelectedOperator.status){
        		case 'CONNECTED':
        			firstParagraph = 'Your Supporter '+ Operators.SelectedOperator.name +' accounts are now connected and your donation level is 15%.';
        			secondParagraph = 'These are your '+ Operators.SelectedOperator.name +' credentials:';
        			break;
        		case 'CHANGED_PASSWORD':
        			firstParagraph = 'We detected a password change at your '+ Operators.SelectedOperator.name +' account.';
        			secondParagraph = 'In order to enable all functionality, please enter your new '+ Operators.SelectedOperator.name +' password:';
        			break;
        		case 'FAILED_CREATE':
        			firstParagraph = 'We could not create an account for you at '+ Operators.SelectedOperator.name +' because your email address was already in use.';
        			secondParagraph = 'Please enter your credentials at '+ Operators.SelectedOperator.name +':';
        			break;
        		case 'UNCONNECTED':
        			firstParagraph = 'Create an account with '+ Operators.SelectedOperator.name +' to support your club with 15% of the proceeds.';
        			secondParagraph = 'If you already are a '+ Operators.SelectedOperator.name +' player you can support your club with 5% of the proceeds. Please sign in here:';
        			showCreateAccountBtn = 'display:block;';
        			break;
        		default:
        			firstParagraph = 'unknown operator status';
        			secondParagraph = 'unknown status';
        	}
        	this.templateData.firstParagraph = firstParagraph;
        	this.templateData.secondParagraph = secondParagraph;
        	this.templateData.showCreateAccountBtn = showCreateAccountBtn;
        	callback();
        },
        
        onRender: function(callback){
        	$('#connectOperatorBtn').on('click',this.connectOperator);
        	callback();
        },
        
        connectOperator: function(){
        	var myOperator = Operators.ActivatedOperators.where({id: Operators.SelectedOperator.id})[0];
        	myOperator.set('key',window.LoggedUser.get('key'));
        	
        	// var operator = new Operator({
				// name: Operators.SelectedOperator.name,
				// key: window.LoggedUser.get('key')
			// });
			
			myOperator.connectAccount({
				username: $('#operatorEmail').val(),
				password: $('#operatorPassword').val()
			},
			{
				success: function(){
					myOperator.set('status','CONNECTED');
					Utils.alert('Account connected successfully.',null,'Success','Ok');
        			return false;
				},
				error: function(){
					myOperator.set('status','FAILED_SIGNIN');
					Utils.alert('Error connecting your account.',null,'Error','Ok');
        			return false;
				}
			});
        	return false;
        }
        
    });

    return View;
});