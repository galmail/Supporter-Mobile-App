/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/ChangeUserEmail.html',
    'text!templates/snippets/EmailHeader.html'
], function ($, _, Backbone, LoggedView, templateSrc, emailHeaderSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.change-user-email',
        onRender: function () {
        	this.$el.prepend(_.template(emailHeaderSrc));
        }
    });

    return View;
});