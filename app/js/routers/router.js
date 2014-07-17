/*global define*/
define([
	'jquery',
	'backbone',
	'foundation',
	'text!templates/footer.html',
	'text!templates/home.html'
], function ($, Backbone, Foundation, footerTemplateSrc, homeTemplateSrc) {
	'use strict';

	var body 		= $('body');
	var container 	= $('.js-main-container');
	var footer 		= $('.js-footer');

	var Router = Backbone.Router.extend({

		routes: {
			'home': 'home', 	//http://localhost/#home
			'login': 'login' 	//http://localhost/#login
		},

		home: function (param) {
			body.addClass('body-not-logged');
			container.html(_.template(homeTemplateSrc));
			footer.html(_.template(footerTemplateSrc));
		},

		login: function (param) {
			body.addClass('body-not-logged');
			//
			footer.html(_.template(footerTemplateSrc));
		}

	});

	return Router;
});