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
        	callback();
        },
        
        onRender: function(){
        	$('#connectOperatorBtn').on('click',this.connectOperator);
        	return this;
        },
        
        connectOperator: function(){
        	var myOperator = Operators.ActivatedOperators.where({id: Operators.SelectedOperator.id})[0];
        	var operator = new Operator({
				name: Operators.SelectedOperator.name,
				key: User.LoggedUser.get('key')
			});
			
			operator.connectAccount({
				username: $('#operatorEmail').val(),
				password: $('#operatorPassword').val()
			},
			{
				success: function(){
					myOperator.set('status','success');
					Utils.alert('Account connected successfully.',null,'Success','Ok');
        			return false;
				},
				error: function(){
					myOperator.set('status','error');
					Utils.alert('Error connecting your account.',null,'Error','Ok');
        			return false;
				}
			});
        	return false;
        }
        
    });

    return View;
});