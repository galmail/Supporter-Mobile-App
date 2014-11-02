/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/UnloggedView',
    'text!templates/OperatorTerms.html'
], function ($, _, Backbone, UnloggedView, templateSrc) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        templateData: Operators.SelectedOperator.attributes,
        element: '.operator-terms',
        onRender: function () {
            // bind back button event
            $('.back-icon').on('click', this.goBack);
        },
        goBack: function(){
        	window.history.back();
        }
    });

    return View;
});