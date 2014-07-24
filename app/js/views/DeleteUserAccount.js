/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/DeleteUserAccountView',
    'text!templates/DeleteUserAccount.html'
], function ($, _, Backbone, DeleteUserAccountView, templateSrc) {
    'use strict';

    var View = DeleteUserAccountView.extend({
        template: _.template(templateSrc)
    });

    return View;
});