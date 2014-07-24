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
	'views/NewAccountEnd',
	'views/MainMenuLogged',
	'views/ChangeClub',
	'views/About',
	'views/DeleteUserAccount',
	'views/DeleteUserEmail',
	'views/DeleteUserPassword',
	'views/UserSettings',
	'views/UserProfile',
	'foundation',
	'offcanvas'
], function ($, Backbone, Foundation,
	MenuLogClearView, PickClubView, KnowMoreView, SignInView, PickClubConfirmView, ClubDisclaimerView,
	RemindPasswordView, CreateNewAccountView, SelectOperatorsView, WarningInfoView, UnifiedRegisterView,
	UnifiedLoginView, OperatorsSingleLoginView, NewAccountEndView, MainMenuLoggedView, ChangeClubView,
	AboutView, DeleteUserAccountView, DeleteUserEmailView, DeleteUserPasswordView, UserSettingsView,
	UserProfileView) {

	'use strict';

	var Router = Backbone.Router.extend({

		routes: {
			'menuLogClear': 			'menuLogClear',
			'pickClub': 				'pickClub',
			'knowMore': 				'knowMore',
			'signIn': 					'signIn',
			'pickClubConfirm/:club': 	'pickClubConfirm',
			'clubDisclaimer': 			'clubDisclaimer',
			'remindPassword': 			'remindPassword',
			'createNewAccount': 		'createNewAccount',
			'selectOperators': 			'selectOperators',
			'warningInfo': 				'warningInfo',
			'unifiedRegister': 			'unifiedRegister',
			'unifiedLogin': 			'unifiedLogin',
			'operatorsSingleLogin': 	'operatorsSingleLogin',
			'newAccountEnd': 			'newAccountEnd',

			//Logged zone
			'changeClub': 				'changeClub',
			'mainMenuLogged': 			'mainMenuLogged',
			'about': 					'about',
			
			'deleteUserAccount': 		'deleteUserAccount',
			'changeUserEmail': 			'changeUserEmail',
			'changeUserPassword': 		'changeUserPassword',
			'userSettings': 			'userSettings',
			'userProfile': 				'userProfile'
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
				clubId: param
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
		operatorsSingleLogin: function () {
			new OperatorsSingleLoginView();
		},
		newAccountEnd: function () {
			new NewAccountEndView();
		},

		//LOGGED ZONE
		changeClub: function () {
			new ChangeClubView();
		},
		mainMenuLogged: function () {
			new MainMenuLoggedView();
		},
		about: function () {
			new AboutView();
		},
		deleteUserAccount: function(){
			new DeleteUserAccountView();
		},
		changeUserEmail: function(){
			new ChangeUserEmailView();
		},
		changeUserPassword: function(){
			new ChangeUserPasswordView();
		},
		userSettings: function(){
			new UserSettingsView();
		},
		userProfile: function(){
			new UserProfileView();
		}
	});

	var instance;

	Router.getInstance = function () {
		return instance || (instance = new Router());
	};

	return Router;
});