/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/KnowMore.html',
    'views/global/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.know-more',
        onRender: function(callback){
        	var $iframe = $('#iframe-about');
        	console.log($iframe);
        	var windowHeight = document.body.clientHeight;
        	var windowWidth = document.body.clientWidth;
        	var containerHeight = $('#container').height();
        	$iframe.width('100%');
        	$iframe.height(windowHeight-containerHeight);
            callback();
        }        
    });

    return View;
});