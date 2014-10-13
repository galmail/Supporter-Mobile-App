/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MenuLogClear.html',
    'views/UnloggedView',
    'config'
], function ($, _, Backbone, templateSrc, UnloggedView, config) {
    'use strict';
    
    console.log('App version: ' + config.version);
	
	var View = UnloggedView.extend({
		template: _.template(templateSrc),
		templateData: {
			welcome: "Welcome"
		},
		element: '.menu-log-clear'
	}); 

    return View;
});