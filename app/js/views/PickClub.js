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

        results: null,

        collection: null,

        events: {
            'keyup .js-search': 'search',
            'click .js-results li': 'onItemClick'
        },

        search: function () {
        	var self = this;
            var searchStr = $('.js-search').val();
            this.collection.search(searchStr, function(collection){
            	self.collection = collection;
            	self.render();
            });
        },

        onItemClick: function (e) {
            var clubId = $(e.currentTarget).data('id');
            window.location.href = '#pickClubConfirm/' + clubId;
        },

        onInit: function () {
            var self = this;
            this.results = this.$el.find('.js-results');
            new AssociationsCollection().getPopular(function(collection){
            	self.collection = collection;
            	self.render();
            });
        },

        render: function () {
            var collection = this.collection;
            this.results.empty();
            for (var i = 0; i < collection.length; i++) {
                var model = collection.at(i);
                var compiled = _.template(elementTemplate);
                var result = compiled({
                    name: model.get('name'),
                    sport: model.get('sport'),
                    borough: model.get('borough'),
                    logo: model.get('logo')
                });
                this.results.append($(result));
            }
        }
    });

    return View;
});
