/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/MainMenuLogged.html',
    'models/base',
    'models/user',
    'collections/categories',
    'text!templates/snippets/MainMenuLoggedCategory.html',
], function ($, _, Backbone, LoggedView, templateSrc, BaseModel, User, Categories, TemplateCategory) {
    'use strict';

    var View = LoggedView.extend({

        template: _.template(templateSrc),
        
        element: '.main-menu-logged',
        
        collection: new Categories(),

        events: {
            //'click li.js-menu-item': 'goToBetting'
        },
        
        onInit: function(callback){
        	var self = this;
        	var name = "guest";
        	var club = "your club";
        	if(window.LoggedUser){
        		name = window.LoggedUser.get('properties').firstName;
        		club = window.LoggedUser.get('clubName');
        	}
        	self.templateData = { name: name, club: club };
        	self.collection.load(function(categories){
        		console.log('loaded categories');
        		callback();
        	});
        },

        onRender: function (callback) {
        	var self = this;
            this.body.addClass('body-not-logged');
            var results = this.$el.find('#linksList');
            this.renderCollection(this.collection, results, TemplateCategory);
            
            // bind category onclick event
            $('.js-menu-item').on('click',function(el){
            	self.showCategoryScreen(el,self);
            });
            
            callback();
        },

        showCategoryScreen: function(el,self) {
        	var category = $(el.currentTarget).find('.team-name').text();
        	self.collection.selectByName(category);
        	window.location.href = '#categoryScreen';
        }

    });

    return View;
});