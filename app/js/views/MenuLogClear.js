/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MenuLogClear.html',
    'views/global/UnloggedView',
    'config'
], function ($, _, Backbone, templateSrc, UnloggedView, config) {
    'use strict';
    
    console.log('App version: ' + config.version);
	
	var View = UnloggedView.extend({
		template: _.template(templateSrc),
		templateData: {
			welcome: "Welcome"
		},
		element: '.menu-log-clear',
		onInit: function(callback){
			localStorage.clear();
			callback();
		}
	}); 

    return View;
});