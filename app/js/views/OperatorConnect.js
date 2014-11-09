/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/OperatorConnect.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.operator-connect',
        
        onInit: function(callback){
        	//this.templateData = Operators.SelectedOperator;
        	callback();
        },
        
        onRender: function () {
        	return this;
        }
        
    });

    return View;
});