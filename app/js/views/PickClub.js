/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PickClub.html'
], function ($, _, Backbone, templateSrc) {
    'use strict';

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(templateSrc),

        events: {
            'keyup .js-search': 'search',
            'click .js-results li' : 'onItemClick'
        },

        initialize: function () {
            this.body = this.$el.parents('body');
            this.render();
            this.searchInput = this.$el.find('.js-search');
            this.results = this.$el.find('.js-results');
        },

        render: function () {
            this.body.addClass('body-not-logged');
            this.$el.html(_.template(templateSrc));
        },

        search: function (e) {
            var that = this;
            setTimeout(function () {
                that.results.fadeIn('slow');
            }, 600);
        },

        onItemClick: function(e) {
            var clubId =  $(e.currentTarget).data('id');
            window.location.href = '#pickClubConfirm/'+clubId;
        }

    });

    return View;
});