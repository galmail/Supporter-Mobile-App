/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/RemindPassword.html',
    'views/global/UnloggedView',
    'models/password',
    'utils'
], function ($, _, Backbone, templateSrc, UnloggedView, Password, Utils) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.remind-password',

        onRender: function (callback) {
            var self = this;
            $('#resetpwd-btn').on('click', self.requestReset);
        },

        requestReset: function () {
            var email = $('#email').val();
            var password = new Password({ email: email });
            password.requestReset(email, function (success, response) {
                if (success) {
                    Utils.alert('Yay!', null, 'Mail is on its way', 'Can\'t wait!');
                } else {
                    Utils.alert('Nope', null, 'No soup for you', 'Oh noes!');
                }
            });
        }
    });

    return View;
});
