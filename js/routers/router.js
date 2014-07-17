/*global define*/
define([
	'jquery',
	'backbone'
], function ($, Backbone) {
	'use strict';

	alert('router');

	var Router = Backbone.Router.extend({
		routes: {
			'home': 'home',		//http://localhost/#home
			'login': 'login'	//http://localhost/#login
		},
		home: function (param) {
			alert('home');
		},
		login: function (param) {
			alert('login');
		}
	});

	return Router;
});