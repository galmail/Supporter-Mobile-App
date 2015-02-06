/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/UnloggedView',
    'text!templates/OperatorTerms.html',
    'collections/operators',
    'models/operator',
    'models/user',
    'utils'
], function ($, _, Backbone, UnloggedView, templateSrc, Operators, Operator, User, Utils) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.operator-terms',

        onInit: function(callback){
        	this.templateData = Operators.SelectedOperator;
        	callback();
        },

        onRender: function (callback) {
            console.log("render OperatorTerms");
            var terms_url =
              this.templateData.i18n[this.templateData.identifier + "_terms_url"];

        	var $iframe = $('#iframe-terms-and-conditions');
        	$iframe.width($iframe.parent().width());
        	$iframe.height($('#container').height()-$iframe.parent().height());
            $iframe.attr('src', terms_url);

            // bind back button event
            $('.back-icon').on('click', this.goBack);
            $('#joinOperatorBtn').on('click', this.joinOperator);
            callback();
        },
        goBack: function(){
        	window.history.back();
        },
        joinOperator: function(){
        	var myOperator = Operators.ActivatedOperators.where({id: Operators.SelectedOperator.id})[0];
        	var operator = new Operator({
				name: Operators.SelectedOperator.name,
				key: window.LoggedUser.get('key')
			});
			operator.createAccount({
				success: function(){
					myOperator.set('status','success');
					Utils.alert('Account created successfully.',null,'Success','Ok');
        			return false;
				},
				error: function(){
					myOperator.set('status','error');
					Utils.alert('Error creating an account.',null,'Error','Ok');
        			return false;
				}
			});
        	return false;
        }
    });

    return View;
});
