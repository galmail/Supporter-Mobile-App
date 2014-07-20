/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/SelectOperators.html',
    'text!templates/snippets/UnifiedRegistration.html'
], function ($, _, Backbone, templateSrc, unifiedRegistrationSrc) {
    'use strict';

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(templateSrc),

        events: {
            'click .js-select-operator-ok': 'onSelectOperatorsOk'
        },

        initialize: function () {
            this.body = this.$el.parents('body');
            this.render();
            this.checkboxes = this.$el.find('input');
        },

        render: function () {
            this.body.addClass('body-not-logged');
            this.$el.html(_.template(templateSrc));
            this.$el.prepend(_.template(unifiedRegistrationSrc, {
                step: 1,
                total: 3
            }));
        },

        onSelectOperatorsOk: function () {
            console.info('MSG', this);
            var allChecked, redirected;
            _.each(this.checkboxes, function (checkbox, i) {
                var newFlag = checkbox.checked;

                if (allChecked === undefined) {
                    allChecked = newFlag;
                }
                else if (allChecked !== newFlag) {
                    window.location.href = '#unifiedRegister';
                    redirected = true;
                }
                console.info('allChecked, newFlag', allChecked, newFlag);
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