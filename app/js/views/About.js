/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/About.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.about',
        onRender: function(callback){
            this.body.addClass('body-not-logged');
            callback();
        }
    });

    return View;
});