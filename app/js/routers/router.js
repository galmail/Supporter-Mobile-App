/*global define*/
define([
	'jquery',
	'backbone',
	'foundation',
	'text!templates/footer.html',
	'text!templates/home.html'
], function ($, Backbone, Foundation, homeTemplateSrc) {
	'use strict';

	var body 		= $('body');
	var containr 	= $('.js-main-container');
	var footer 		= $('.js-footer');

	var Router = Backbone.Router.extend({

		routes: {
			'home': 'home', //http://localhost/#home
			'login': 'login' //http://localhost/#login
		},

		home: function (param) {
			body.addClass('body-not-logged');
			containr.html(_.template(homeTemplateSrc));
			footer.html(_.template(footerTemplateSrc));
		},

		login: function (param) {
			alert('login');
		}

	});

	return Router;
});