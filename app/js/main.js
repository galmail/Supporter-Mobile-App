/*global require*/
'use strict';

require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		},
		foundation: {
			deps: [
				'jquery'
			],
			exports: 'Foundation'
		}
	},
	paths: {
		jquery: 'libs/jquery/jquery',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		backboneLocalstorage: 'libs/backbone.localStorage/backbone.localStorage',
		text: 'libs/requirejs-text/text',
		modernizr: 'libs/modernizr/modernizr',
		foundation: 'libs/foundation/foundation.min'
	}
});

require([
	'backbone',
	'routers/router'
], function (Backbone, Router) {
	var router = Router.getInstance();
	Backbone.history.start();
	//router.navigate('menuLogClear', {trigger: true});
});