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
    
    var polyglot = new Polyglot();
	polyglot.extend({
		'welcome': 'Welcome'
	});
	
	var View = UnloggedView.extend({
		template: _.template(templateSrc),
		templateData: {
			welcome: polyglot.t('welcome')
		},
		element: '.menu-log-clear'
	}); 

    return View;
});