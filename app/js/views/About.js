/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/About.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        onRender: function () {
            this.body.addClass('body-not-logged');
        }
    });

    return View;
});