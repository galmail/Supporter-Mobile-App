/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MenuLogClear.html',
    'views/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';
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