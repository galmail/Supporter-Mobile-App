/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/SelectOperators.html',
    'views/UnloggedView',
    'collections/operators',
    'text!templates/snippets/SelectOperatorsElement.html'
], function ($, _, Backbone, templateSrc, UnloggedView, Operators, elementTemplate) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.select-operators',
        collection: null,
        unifiedRegStep: 1,
        events: {
            'click .js-select-operator-ok': 'onSelectOperatorsOk'
        },
        
        onInit: function(callback){
        	var self = this;
        	// get available operators
        	new Operators().getAvailable(function(availableOperators){
        		self.collection = availableOperators;
        		callback();
        	});
        },
        
        onRender: function () {
        	console.log('SelectOperators render');
        	var results = this.$el.find('#operatorsList');
            this.renderCollection(this.collection, results, elementTemplate);
        },

        onSelectOperatorsOk: function () {
            var allChecked, redirected;
            var checkboxes = this.$el.find('input');
            _.each(checkboxes, function (checkbox, i) {
                var newFlag = checkbox.checked;

                if (allChecked === undefined) {
                    allChecked = newFlag;
                }
                else if (allChecked !== newFlag) {
                    window.location.href = '#unifiedRegister';
                    redirected = true;
                }

            }, this);

            if (redirected) {
                return;
            }
            else if (allChecked) {
                window.location.href = '#warningInfo';
            }
            else {
                window.location.href = '#mainMenuLogged';
            }
        }
    });

    return View;
});