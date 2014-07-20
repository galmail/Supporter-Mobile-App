/*global define*/
define([
	'jquery',
	'backbone',
	'foundation',
	'views/MenuLogClear',
	'views/PickClub',
	'views/KnowMore',
	'views/SignIn',
	'views/PickClubConfirm',
	'views/ClubDisclaimer',
	'views/RemindPassword',
	'views/CreateNewAccount',
	'views/SelectOperators',
	'views/WarningInfo',
	'views/UnifiedRegister',
	'views/UnifiedLogin',
	'views/OperatorsSingleLogin',
	'views/NewAccountEnd'
], function ($, Backbone, Foundation,
	MenuLogClearView, PickClubView, KnowMoreView, SignInView, PickClubConfirmView, ClubDisclaimerView,
	RemindPasswordView, CreateNewAccountView, SelectOperatorsView, WarningInfoView, UnifiedRegisterView,
	UnifiedLoginView, OperatorsSingleLoginView, NewAccountEndView) {

	'use strict';

	var Router = Backbone.Router.extend({

		routes: {
			'menuLogClear': 'menuLogClear',
			'pickClub': 'pickClub',
			'knowMore': 'knowMore',
			'signIn': 'signIn',
			'pickClubConfirm/:club': 'pickClubConfirm',
			'clubDisclaimer': 'clubDisclaimer',
			'remindPassword': 'remindPassword',
			'createNewAccount': 'createNewAccount',
			'selectOperators': 'selectOperators',
			'warningInfo': 'warningInfo',
			'unifiedRegister': 'unifiedRegister',
			'unifiedLogin': 'unifiedLogin',
			'operatorsSingleLogin': 'operatorsSingleLogin',
			'newAccountEnd': 'newAccountEnd'
		},

		menuLogClear: function () {
			new MenuLogClearView();
		},
		pickClub: function () {
			new PickClubView();
		},
		knowMore: function () {
			new KnowMoreView();
		},
		signIn: function () {
			new SignInView();
		},
		pickClubConfirm: function (param) {
			new PickClubConfirmView({
				club: param
			});
		},
		clubDisclaimer: function () {
			new ClubDisclaimerView();
		},
		remindPassword: function () {
			new RemindPasswordView();
		},
		createNewAccount: function () {
			new CreateNewAccountView();
		},
		selectOperators: function () {
			new SelectOperatorsView();
		},
		warningInfo: function () {
			new WarningInfoView();
		},
		unifiedRegister: function () {
			new UnifiedRegisterView();
		},
		unifiedLogin: function () {
			new UnifiedLoginView();
		},
		opperatorSingleLogin: function () {
			new OperatorsSingleLoginView();
		},
		newAccountEnd: function () {
			new NewAccountEndView();
		}

	});

	var instance;

	Router.getInstance = function () {
		return instance || (instance = new Router());
	};

	return Router;
});