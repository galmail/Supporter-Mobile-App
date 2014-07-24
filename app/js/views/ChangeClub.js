/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ChangeClub.html'
], function ($, _, Backbone, templateSrc) {
    'use strict';

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(templateSrc),

        events: {
        },

        initialize: function () {
            this.body = this.$el.parents('body');
            this.render();
            this.searchInput = this.$el.find('.js-search');
            this.results = this.$el.find('.js-results');
        },

        render: function () {
            this.$el.html(_.template(templateSrc));
        },

        onItemClick: function(e) {
            var clubId =  $(e.currentTarget).data('id');
            window.location.href = '#pickClubConfirm/'+clubId;
        }

    });

    return View;
});