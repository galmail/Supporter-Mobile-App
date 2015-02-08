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
                var i18n = this.templateData.i18n;
                $('#resetpwd-btn').on('click', function () {
                    var email = $('#email').val();
                    if (email.trim() === '') {
                        Utils.alert(i18n.emailcantbeempty_txt, null, i18n.Error, i18n.Ok);
                        return false;
                    }
                    var password = new Password({ email: email });
                    password.requestReset(email, function (success, response) {
                        var msg;
                        // if (response.message !== null) msg = response.message;
                        // Utils.alert(msg, null, success ? i18n.Success : i18n.Error, i18n.Ok);
                        if (success) {
                            Utils.alert(i18n.resetemailsend_txt, null, i18n.Success, i18n.Ok);
                        } else {
                            Utils.alert(i18n.resetemailnotsend_txt, null, i18n.Error, i18n.Ok);
                            return false;
                        }
                    });
                });
            }
        });

        return View;
});
