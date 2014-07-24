/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ChangeUserPasswordView',
    'text!templates/ChangeUserPassword.html'
], function ($, _, Backbone, ChangeUserPasswordView, templateSrc) {
    'use strict';

    var View = ChangeUserPasswordView.extend({
        template: _.template(templateSrc)
    });

    return View;
});