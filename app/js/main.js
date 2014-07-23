/*global require*/
//'use strict';

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

    	"foundation": ['jquery'],
    	"foundation.offcanvas": ['foundation']
	},
	paths: {
		jquery: 'libs/jquery/jquery',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		backboneLocalstorage: 'libs/backbone.localStorage/backbone.localStorage',
		text: 'libs/requirejs-text/text',
		modernizr: 'libs/modernizr/modernizr',
		foundation: 'libs/foundation/foundation',
    	'foundation.offcanvas': 'libs/foundation/foundation.offcanvas',
	}
});

require([
	'backbone',
	'routers/router',
    'foundation',
    'foundation.offcanvas'
], function (Backbone, Router) {

	$(document).foundation({
	  offcanvas : {
	    open_method: 'move', // Sets method in which offcanvas opens, can also be 'overlap'
	    close_on_click : true
	  }
	});



    console.info('foundation', $(document).foundation, Foundation);
	var router = Router.getInstance();
	Backbone.history.start();
	//router.navigate('menuLogClear', {trigger: true});
});