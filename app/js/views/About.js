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
        	var $iframe = $('#iframe-about');
        	var windowHeight = document.body.clientHeight;
        	var windowWidth = document.body.clientWidth;
        	var containerHeight = $('#container').height();
        	$iframe.width('100%');
        	$iframe.height(windowHeight-containerHeight);
            this.body.addClass('body-not-logged');
            callback();
        }
    });

    return View;
});