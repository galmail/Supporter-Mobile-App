/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ChangeUserEmailView',
    'text!templates/ChangeUserEmail.html'
], function ($, _, Backbone, ChangeUserEmailView, templateSrc) {
    'use strict';

    var View = ChangeUserEmailView.extend({
        template: _.template(templateSrc)
    });

    return View;
});