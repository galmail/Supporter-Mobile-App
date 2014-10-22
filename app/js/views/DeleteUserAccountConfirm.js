/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/DeleteUserAccountConfirm.html',
    'text!templates/snippets/EmailHeader.html'
], function ($, _, Backbone, LoggedView, templateSrc, emailHeaderSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.delete-user-account-confirm',
        onRender: function() {
            this.$el.prepend(_.template(emailHeaderSrc));
        }
    });

    return View;
});