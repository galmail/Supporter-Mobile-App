/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/UnloggedView',
    'text!templates/OperatorTerms.html',
    'collections/operators'
], function ($, _, Backbone, UnloggedView, templateSrc, Operators) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.operator-terms',
        
        onInit: function(callback){
        	this.templateData = Operators.SelectedOperator;
        	callback();
        },
        
        onRender: function () {
        	var $iframe = $('#iframe-terms-and-conditions');
        	$iframe.width($iframe.parent().width());
        	$iframe.height($('#container').height()-$iframe.parent().height());
        	
        	
        	
            // bind back button event
            $('.back-icon').on('click', this.goBack);
        },
        goBack: function(){
        	window.history.back();
        }
    });

    return View;
});