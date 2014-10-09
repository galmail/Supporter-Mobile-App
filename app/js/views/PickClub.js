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
            // var searchStr = $('.js-search').val();
            // this.collection.fetch(searchStr);
            this.render();
        },

        onItemClick: function (e) {
            var clubId = $(e.currentTarget).data('id');
            window.location.href = '#pickClubConfirm/' + clubId;
        },

        onInit: function () {
            this.results = this.$el.find('.js-results');

            this.collection = new AssociationsCollection();
            // collection.fetch();

            this.collection.add([{
                'id': '13294',
                'name': 'Degerfors IF',
                'sport': 'Fotboll',
                'logo': 'hammarby.png',
                'csv_id': '20617',
                'borough': 'Degerfors'
            }, {
                'id': '18071',
                'name': 'Gränbyskolans IF',
                'sport': 'Skolidrott',
                'logo': 'malmo.png',
                'csv_id': '41261',
                'borough': 'Uppsala'
            }, {
                'id': '18100',
                'name': 'Fotbollsklubb Bosna Skövde',
                'sport': 'Fotboll',
                'logo': '',
                'csv_id': '20926',
                'borough': 'Skövde'
            }]);

            this.render();
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
