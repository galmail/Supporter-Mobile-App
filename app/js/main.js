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
		backboneLocalStorage: {
			deps: ['backbone'],
			exports: 'bbLocalStorage'
		},
		backboneDualStorage: {
			deps: ['underscore','backbone'],
			exports: 'bbDualStorage'
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
	    },
	    topbar: {
	      deps: ['jquery', 'foundation'],
	      exports: 'topbar'
	    },
	    tabs: {
	      deps: ['jquery', 'foundation'],
	      exports: 'tabs'
	    }
	},
	paths: {
		jquery: 'libs/jquery/jquery',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		backboneLocalStorage: 'libs/backbone.localStorage/backbone.localStorage',
		backboneDualStorage: 'libs/backbone.dualStorage/backbone.dualStorage',
		text: 'libs/requirejs-text/text',
		modernizr: 'libs/modernizr/modernizr',
		foundation: 'libs/foundation/foundation',
    	offcanvas: 'libs/foundation/foundation.offcanvas',
    	topbar: 'libs/foundation/foundation.topbar',
    	tabs: 'libs/foundation/foundation.tabs'
	}
});

require([
	'backbone',
	'routers/router',
	'views/global/MainView'
], function (Backbone, Router, MainView) {
	
	var init = function(){
		var router = Router.getInstance();
		Backbone.history.start();
		$(document).foundation();
		if(window.rootPage){
			router.navigate(window.rootPage, {trigger: true});
		}
	};
	// initialize main view
    var mainView = new MainView({ el:$("#content") });
    mainView.loadI18n(function(){
    	mainView.renderView();
    	init();
    });
	
});