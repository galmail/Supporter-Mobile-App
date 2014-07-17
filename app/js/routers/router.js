/*global define*/
define([
	'jquery',
	'backbone',
	'foundation',
	'views/home'
], function ($, Backbone, Foundation, HomeView) {
	'use strict';

	var Router = Backbone.Router.extend({

		routes: {
			'home': 'home', 	//http://localhost/#home
			'login': 'login' 	//http://localhost/#login
		},

		home: function (param) {
			new HomeView();
		},

		login: function (param) {
		}

	});

	return Router;
});