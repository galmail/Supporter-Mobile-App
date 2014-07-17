/*global define*/
define([
	'jquery',
	'backbone',
	'foundation',
	'text!templates/home.html'
], function ($, Backbone, Foundation, templateSrc) {
	'use strict';

	var mainContainer = $('.main-container');

	var Router = Backbone.Router.extend({
		routes: {
			'home': 'home', //http://localhost/#home
			'login': 'login' //http://localhost/#login
		},
		home: function (param) {
			console.info('src', templateSrc);
			var data = {
				name: 'moe'
			};

			var compiled = _.template(templateSrc, data);

			mainContainer.html(compiled);
		},
		login: function (param) {
			alert('login');
		}
	});

	return Router;
});