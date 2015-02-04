/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/DeleteUserAccount.html',
    'text!templates/snippets/EmailHeader.html'
], function ($, _, Backbone, LoggedView, templateSrc, emailHeaderSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.delete-user-account',
        onRender: function(callback) {
            this.$el.prepend(_.template(emailHeaderSrc));
            callback();
        }
    });

    return View;
});