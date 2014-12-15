/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/MainMenuLogged.html',
    'models/base',
    'collections/categories',
    'text!templates/snippets/MainMenuLoggedCategory.html',
], function ($, _, Backbone, LoggedView, templateSrc, BaseModel, Categories, TemplateCategory) {
    'use strict';

    var View = LoggedView.extend({

        template: _.template(templateSrc),
        
        element: '.main-menu-logged',
        
        collection: new Categories(),

        events: {
            'click li.js-menu-item': 'goToBetting'
        },
        
        onInit: function(callback){
        	var self = this;
        	self.collection.load(function(categories){
        		console.log('loaded categories');
        		callback();
        	});
        },

        onRender: function () {
            this.body.addClass('body-not-logged');
            var results = this.$el.find('#linksList');
            this.renderCollection(this.collection, results, TemplateCategory);
            return this;
        },

        goToBetting: function(el) {
            window.location.href = '#' + el.currentTarget.id;
        }

    });

    return View;
});