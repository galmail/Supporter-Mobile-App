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
            'click li' : 'onItemClick'
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
                that.results.removeClass('hide');
            }, 600);
        },

        onItemClick: function() {
            window.location.href = '#pickClubConfirm';
        }

    });

    return View;
});