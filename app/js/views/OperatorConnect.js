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
        	var showConnectAccountBtn = 'display:block;';
        	var showPasswordBtn = 'display:none;';
        	
        	switch(Operators.SelectedOperator.status){
        		case 'CONNECTED':
        			firstParagraph = 'Your Supporter '+ Operators.SelectedOperator.name +' accounts are now connected and your donation level is '+ Operators.SelectedOperator.generosity +'%.';
        			if(Operators.SelectedOperator.balance){
        				firstParagraph = 'Your Supporter '+ Operators.SelectedOperator.name +' accounts are now connected. Your account balance is'+ Operators.SelectedOperator.balance +' and your donation level is '+ Operators.SelectedOperator.generosity +'%.';
        			}
        			secondParagraph = 'These are your '+ Operators.SelectedOperator.name +' credentials:';
        			showConnectAccountBtn = 'display:none;';
        			showPasswordBtn = 'display:block;';
        			break;
        		case 'PENDING_ACTIVATION':
        			firstParagraph = 'Your Supporter '+ Operators.SelectedOperator.name +' accounts are now connected and your donation level is '+ Operators.SelectedOperator.generosity +'%.';
        			secondParagraph = 'These are your '+ Operators.SelectedOperator.name +' credentials:';
        			showConnectAccountBtn = 'display:none;';
        			showPasswordBtn = 'display:block;';
        			break;
        		case 'CHANGED_PASSWORD':
        			firstParagraph = 'We detected a password change at your '+ Operators.SelectedOperator.name +' account.';
        			secondParagraph = 'In order to enable all functionality, please enter your new '+ Operators.SelectedOperator.name +' password:';
        			break;
        		case 'FAILED_CREATE':
        			firstParagraph = 'We could not create an account for you at '+ Operators.SelectedOperator.name +' because your email address was already in use.';
        			secondParagraph = 'Please enter your credentials at '+ Operators.SelectedOperator.name +':';
        			break;
        		case 'FAILED_SIGNIN':
        			firstParagraph = 'The sign in attempt at '+ Operators.SelectedOperator.name +' failed, please verify your credentials:';
        			secondParagraph = '';
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
        	this.templateData.showConnectAccountBtn = showConnectAccountBtn;
        	this.templateData.showPasswordBtn = showPasswordBtn;
        	callback();
        },
        
        onRender: function(callback){
        	var self = this;
        	$('#connectOperatorBtn').on('click',this.connectOperator);
        	$('#showHidePasswordBtn').on('click',this.showHidePassword);
        	$('#createAccountBtn').on('click',function(){ self.createAccount(); return false; });
        	callback();
        },
        
        createAccount: function(){
        	var self = this;
        	$('#loader').text(self.templateData.i18n.StandByWhileWeCreate);
    		$('#loader').show();
    		var myOperator = Operators.ActivatedOperators.where({id: Operators.SelectedOperator.id})[0];
    		myOperator.set('key',window.LoggedUser.get('key'));
    		
    		myOperator.createAccount({
				success: function(){
					$('#loader').hide();
					$('#loader').text(self.templateData.i18n.Loading);
					myOperator.set('status','CONNECTED');
					Utils.alert('Account connected successfully.',function(){
						window.location.href="#operatorsList/hidebackbutton";
					},'Success','Ok');
				},
				error: function(){
					$('#loader').hide();
					$('#loader').text(self.templateData.i18n.Loading);
					myOperator.set('status','FAILED_SIGNIN');
					Utils.alert('Error connecting your account.',function(){
						window.location.href="#operatorsList/hidebackbutton";
					},'Error','Ok');
				}
			});
        },
        
        showHidePassword: function(){
        	if($('#operatorPassword').attr('type')=='password'){
        		$('#operatorPassword').attr('type','text');
        		$('#showHidePasswordBtn').text('Hide Password');
        	}
        	else {
        		$('#operatorPassword').attr('type','password');
        		$('#showHidePasswordBtn').text('Show Password');
        	}
        	return false;
        },
        
        connectOperator: function(){
        	var myOperator = Operators.ActivatedOperators.where({id: Operators.SelectedOperator.id})[0];
        	myOperator.set('key',window.LoggedUser.get('key'));
			
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