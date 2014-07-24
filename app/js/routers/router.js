/*global define*/
define([
	'jquery',
	'backbone',
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
	'views/ChangeClubSelection',
	'views/About',
	'views/DeleteUserAccount',
	'views/ChangeUserEmail',
	'views/ChangeUserPassword',
	'views/UserSettings',
	'views/UserProfile',
	'views/EditUnifiedData',
	'views/DeleteUserAccountDone',
	'views/UserBets',
	'foundation',
	'offcanvas'
], function ($, Backbone,
	MenuLogClearView, PickClubView, KnowMoreView, SignInView, PickClubConfirmView, ClubDisclaimerView,
	RemindPasswordView, CreateNewAccountView, SelectOperatorsView, WarningInfoView, UnifiedRegisterView,
	UnifiedLoginView, OperatorsSingleLoginView, NewAccountEndView, MainMenuLoggedView, ChangeClubView,
	ChangeClubSelectionView,
	AboutView, DeleteUserAccountView, ChangeUserEmailView, ChangeUserPasswordView, UserSettingsView,
	UserProfileView, EditUnifiedDataView, DeleteUserAccountDoneView, UserBetsView) {

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
			'changeClubSelection':      'changeClubSelection',
			'changeClub': 				'changeClub',
			'mainMenuLogged': 			'mainMenuLogged',
			'about': 					'about',
			'deleteUserAccount': 		'deleteUserAccount',
			'changeUserEmail': 			'changeUserEmail',
			'changeUserPassword': 		'changeUserPassword',
			'userSettings': 			'userSettings',
			'userProfile': 				'userProfile',
			'editUnifiedData': 			'editUnifiedData',
			'deleteUserAccountDone': 	'deleteUserAccountDone',
			'userBets': 				'userBets'
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
		changeClubSelection: function () {
			new ChangeClubSelectionView();
		},
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
		},
		editUnifiedData: function(){
			new EditUnifiedDataView();
		},
		deleteUserAccountDone: function(){
			new DeleteUserAccountDoneView();
		},
		userBets: function(){
			new UserBetsView();
		}
	});

	var instance;

	Router.getInstance = function () {
		return instance || (instance = new Router());
	};

	return Router;
});