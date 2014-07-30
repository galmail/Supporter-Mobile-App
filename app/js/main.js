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
	    foundation: {
	      deps: ['jquery', 'modernizr']
	    },
	    modernizr: {
	      deps: ['jquery']
	    },
	    offcanvas: {
	      deps: ['jquery', 'foundation'],
	      exports: 'offcanvas'
	    }
	},
	paths: {
		jquery: 'libs/jquery/jquery',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		backboneLocalstorage: 'libs/backbone.localStorage/backbone.localStorage',
		text: 'libs/requirejs-text/text',
		modernizr: 'libs/modernizr/modernizr',
		foundation: 'libs/foundation/foundation',
    	offcanvas: 'libs/foundation/foundation.offcanvas'
	}
});

require([
	'backbone',
	'routers/router',
	'views/MainView'
], function (Backbone, Router, AppView) {
	// initialize main view
    var mainView = new AppView({ el:$("#content") });
	var router = Router.getInstance();
	Backbone.history.start();
	//router.navigate('menuLogClear', {trigger: true});
	$(document).foundation();
	//$('body').css('max-height', $(window).height());
});