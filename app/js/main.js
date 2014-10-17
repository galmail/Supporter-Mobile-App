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
	    },
	    topbar: {
	      deps: ['jquery', 'foundation'],
	      exports: 'topbar'
	    },
	    tabs: {
	      deps: ['jquery', 'foundation'],
	      exports: 'tabs'
	    },
	    polyglot: {
	      exports: 'polyglot'
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
    	offcanvas: 'libs/foundation/foundation.offcanvas',
    	topbar: 'libs/foundation/foundation.topbar',
    	tabs: 'libs/foundation/foundation.tabs',
    	polyglot: 'libs/polyglot/polyglot.min'
	}
});

require([
	'backbone',
	'routers/router',
	'views/MainView',
	'models/i18n',
], function (Backbone, Router, MainView, I18n) {
	// initialize main view
    var mainView = new MainView({ el:$("#content") });
	var router = Router.getInstance();
	Backbone.history.start();
	$(document).foundation();
	// load translations
	var userLang = navigator.language;
	window.i18n = new I18n({code: 'sv'});
	window.i18n.load(function(){
		if(window.rootPage){
			router.navigate(window.rootPage, {trigger: true});
		}
	});
});