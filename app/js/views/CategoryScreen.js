/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/CategoryScreen.html',
    'collections/categories',
    'collections/links',
    'text!templates/snippets/CategoryScreenLink.html',
], function ($, _, Backbone, LoggedView, templateSrc, Categories, Links, TemplateLink) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.category-screen',
        collection: new Links(),
        
        onInit: function(callback){
        	this.templateData = Categories.selectedCategory.attributes;
        	this.collection = Categories.selectedCategory.get('links');
        	callback();
        },
        
        onRender: function(){
        	this.body.addClass('body-not-logged');
        	var results = this.$el.find('#operatorsLinkList');
        	this.renderCollection(this.collection, results, TemplateLink);
        	return this;
        }
    });

    return View;
});