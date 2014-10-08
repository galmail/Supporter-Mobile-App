/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/SelectOperators.html',
    'views/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.select-operators',
        unifiedRegStep: 1,
        events: {
            'click .js-select-operator-ok': 'onSelectOperatorsOk'
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