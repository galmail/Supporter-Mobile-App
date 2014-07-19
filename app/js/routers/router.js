/*global define*/
define([
	'jquery',
	'backbone',
	'foundation',
	'views/menuLogClear',
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
			'menuLogClear'			: 'menuLogClear',
			'pickClub' 				: 'pickClub',
			'knowMore' 				: 'knowMore',
			'signIn' 				: 'signIn',
			'pickClubConfirm' 		: 'pickClubConfirm',
			'clubDisclaimer' 		: 'clubDisclaimer',
			'remindPassword' 		: 'remindPassword',
			'createNewAccount' 		: 'createNewAccount',
			'selectOperators'		: 'selectOperators',
			'warningInfo' 			: 'warningInfo',
			'unifiedRegister' 		: 'unifiedRegister',
			'unifiedLogin' 			: 'unifiedLogin',
			'operatorsSingleLogin'	: 'operatorsSingleLogin',
			'newAccountEnd'			: 'newAccountEnd'
		},

		menuLogClear: function (param) {
			new MenuLogClearView();
		},
		pickClub: function (param) {
			new PickClubView();
		},
		knowMore: function (param) {
			new KnowMoreView();
		},
		signIn: function (param) {
			new SignInView();
		},
		pickClubConfirm: function (param) {
			new PickClubConfirmView();
		},
		clubDisclaimer: function (param) {
			new ClubDisclaimerView();
		},
		remindPassword: function (param) {
			new RemindPasswordView();
		},
		createNewAccount: function (param) {
			new CreateNewAccountView();
		},
		selectOperators: function (param) {
			new SelectOperatorsView();
		},
		warningInfo: function (param) {
			new WarningInfoView();
		},
		unifiedRegister: function (param) {
			new UnifiedRegisterView();
		},
		unifiedLogin: function (param) {
			new UnifiedLoginView();
		},
		opperatorSingleLogin: function (param) {
			new OperatorsSingleLoginView();
		},
		newAccountEnd: function (param) {
			new NewAccountEndView();
		}

	});

	var instance;

    Router.getInstance = function () {
        return instance || (instance = new Router());
    };

	return Router;
});