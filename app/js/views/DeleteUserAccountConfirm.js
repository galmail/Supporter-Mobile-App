/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/DeleteUserAccountConfirm.html',
    'text!templates/snippets/EmailHeader.html'
], function ($, _, Backbone, LoggedView, templateSrc, emailHeaderSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        onRender: function() {
            this.$el.find('.delete-user-account-confirm').prepend(_.template(emailHeaderSrc));
        }
    });

    return View;
});