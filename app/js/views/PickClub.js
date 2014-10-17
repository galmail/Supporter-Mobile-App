/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PickClub.html',
    'views/UnloggedView',
    'collections/associations',
    'text!templates/snippets/PickClubElement.html'
], function ($, _, Backbone, templateSrc, UnloggedView, AssociationsCollection, elementTemplate) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),

        element: '.pick-club',
        
        collection: null,

        results: null,

        events: {
            'keyup .js-search': 'search',
            'click .js-results li': 'selectClub'
        },

        search: function () {
        	var self = this;
            var searchStr = $('.js-search').val();
            this.collection.search(searchStr, function(collection){
            	self.collection = collection;
            	self.renderCollection(collection, self.results, elementTemplate);
            });
        },

        selectClub: function (e) {
            var clubId = $(e.currentTarget).data('id');
            AssociationsCollection.selectedAssociation = this.collection.get(clubId);
            window.location.href = '#pickClubConfirm';
        },

        onRender: function () {
        	console.log('PickClub init');
            var self = this;
            this.results = this.$el.find('.js-results');
            new AssociationsCollection().getPopular(function(collection){
            	self.collection = collection;
            	self.renderCollection(collection, self.results, elementTemplate);
            });
            return this;
        }
        
    });

    return View;
});
