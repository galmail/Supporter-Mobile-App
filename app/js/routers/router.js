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
	'views/UserFavorites',
	'views/OperatorsList',
	'views/About',
	'views/DeleteUserAccount',
	'views/ChangeUserEmail',
	'views/ChangeUserPassword',
	'views/UserSettings',
	'views/UserProfile',
	'views/EditUnifiedData',
	'views/DeleteUserAccountDone',
	'views/UserBets',
	'views/UserWallet',
	'views/UserStatistics',
	'views/DeleteUserAccountConfirm',
	// Bet Process Zone
	'views/EventsAllFilter',
	'views/EventsMostPlayed',
	'views/EventsLiveScoresFilter',
	'views/EventsByCountrySubmenu',
	'views/EventDetails',
	'views/MostPlayedSubmenuFilter',
	'views/LiveScoresSubmenu',
	'views/AllFilterByCountry',
	'views/ByCountrySubmenuFilter',
	'views/EventDetailsLive',
	'views/LiveScoresSubmenuFilter',
	'views/AllFilterByLeage',
	'views/EventByCountryDetail',
	'views/AllFilterByLeageSubmenu',
	'views/BetOpenProcess',
	'views/BetOpenProcessPayment',
	
	'foundation',
	'offcanvas',
	'topbar',
	'tabs'
], function ($, Backbone,
	MenuLogClearView, PickClubView, KnowMoreView, SignInView, PickClubConfirmView, ClubDisclaimerView,
	RemindPasswordView, CreateNewAccountView, SelectOperatorsView, WarningInfoView, UnifiedRegisterView,
	UnifiedLoginView, OperatorsSingleLoginView, NewAccountEndView, MainMenuLoggedView, ChangeClubView,
	ChangeClubSelectionView, UserFavoritesView, OperatorsListView,
	AboutView, DeleteUserAccountView, ChangeUserEmailView, ChangeUserPasswordView, UserSettingsView,
	UserProfileView, EditUnifiedDataView, DeleteUserAccountDoneView, UserBetsView, UserWalletView,
	UserStatisticsView, DeleteUserAccountConfirmView, EventsAllFilterView, EventsMostPlayedView,
	EventsLiveScoresFilterView, EventsByCountrySubmenuView, EventDetailsView, MostPlayedSubmenuFilterView,
	LiveScoresSubmenuView, AllFilterByCountryView, ByCountrySubmenuFilterView, EventDetailsLiveView,
	LiveScoresSubmenuFilterView, AllFilterByLeageView, EventByCountryDetailView, AllFilterByLeageSubmenuView,
	BetOpenProcessView, BetOpenProcessPaymentView) {

	'use strict';

	var Router = Backbone.Router.extend({

		routes: {
			'menuLogClear': 				'menuLogClear',
			'pickClub': 					'pickClub',
			'knowMore': 					'knowMore',
			'signIn': 						'signIn',
			'pickClubConfirm': 				'pickClubConfirm',
			'clubDisclaimer': 				'clubDisclaimer',
			'remindPassword': 				'remindPassword',
			'createNewAccount': 			'createNewAccount',
			'selectOperators': 				'selectOperators',
			'warningInfo': 					'warningInfo',
			'unifiedRegister': 				'unifiedRegister',
			'unifiedLogin': 				'unifiedLogin',
			'operatorsSingleLogin': 		'operatorsSingleLogin',
			'newAccountEnd': 				'newAccountEnd',

			//Logged zone
			'operatorsList': 				'operatorsList',
			'userFavorites': 				'userFavorites',
			'changeClubSelection/:club': 	'changeClubSelection',
			'changeClub': 					'changeClub',
			'mainMenuLogged': 				'mainMenuLogged',
			'about': 						'about',
			'deleteUserAccount': 			'deleteUserAccount',
			'changeUserEmail': 				'changeUserEmail',
			'changeUserPassword': 			'changeUserPassword',
			'userSettings': 				'userSettings',
			'userProfile': 					'userProfile',
			'editUnifiedData': 				'editUnifiedData',
			'deleteUserAccountDone': 		'deleteUserAccountDone',
			'userBets': 					'userBets',
			'userWallet': 					'userWallet',
			'userStatistics': 				'userStatistics',
			'deleteUserAccountConfirm': 	'deleteUserAccountConfirm',

			//Bet process zone
			'eventsAllFilter': 				'eventsAllFilter',
			'eventsMostPlayed': 			'eventsMostPlayed',
			'eventsLiveScoresFilter': 		'eventsLiveScoresFilter',
			'eventsByCountrySubmenu': 		'eventsByCountrySubmenu',
			'eventDetails': 				'eventDetails',
			'mostPlayedSubmenuFilter': 		'mostPlayedSubmenuFilter',
			'liveScoresSubmenu': 			'liveScoresSubmenu',
			'allFilterByCountry': 			'allFilterByCountry',
			'byCountrySubmenuFilter': 		'byCountrySubmenuFilter',
			'eventDetailsLive': 			'eventDetailsLive',
			'liveScoresSubmenuFilter': 		'liveScoresSubmenuFilter',
			'allFilterByLeage': 			'allFilterByLeage',
			'eventByCountryDetail': 		'eventByCountryDetail',
			'allFilterByLeageSubmenu': 		'allFilterByLeageSubmenu',
			'betOpenProcess': 				'betOpenProcess',
			'betOpenProcessPayment': 		'betOpenProcessPayment'
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
		pickClubConfirm: function () {
			new PickClubConfirmView();
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
		operatorsList: function () {
			new OperatorsListView();
		},
		userFavorites: function () {
			new UserFavoritesView();
		},
		changeClubSelection: function (param) {
			new ChangeClubSelectionView({
				clubId: param
			});
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
		},
		userWallet: function(){
			new UserWalletView();
		},
		userStatistics: function(){
			new UserStatisticsView();
		},
		deleteUserAccountConfirm: function(){
			new DeleteUserAccountConfirmView();
		},

		// BETTING PROCESS
		eventsAllFilter: function(){
			new EventsAllFilterView();
		},
		eventsMostPlayed: function(){
			new EventsMostPlayedView();
		},
		eventsLiveScoresFilter: function(){
			new EventsLiveScoresFilterView();
		},
		eventsByCountrySubmenu: function(){
			new EventsByCountrySubmenuView();
		},
		eventDetails: function(){
			new EventDetailsView();
		},
		mostPlayedSubmenuFilter: function(){
			new MostPlayedSubmenuFilterView();
		},
		liveScoresSubmenu: function(){
			new LiveScoresSubmenuView();
		},
		allFilterByCountry: function(){
			new AllFilterByCountryView();
		},
		byCountrySubmenuFilter: function(){
			new ByCountrySubmenuFilterView();
		},
		eventDetailsLive: function(){
			new EventDetailsLiveView();
		},
		liveScoresSubmenuFilter: function(){
			new LiveScoresSubmenuFilterView();
		},
		allFilterByLeage: function(){
			new AllFilterByLeageView();
		},
		eventByCountryDetail: function(){
			new EventByCountryDetailView();
		},
		allFilterByLeageSubmenu: function(){
			new AllFilterByLeageSubmenuView();
		},
		betOpenProcess: function(){
			new BetOpenProcessView();
		},
		betOpenProcessPayment: function(){
			new BetOpenProcessPaymentView();
		}
	});

	var instance;

	Router.getInstance = function () {
		return instance || (instance = new Router());
	};

	return Router;
});