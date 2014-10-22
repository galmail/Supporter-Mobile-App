/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/ChangeClub.html',
    'text!templates/snippets/EmailHeader.html'
], function ($, _, Backbone, LoggedView, templateSrc, emailHeaderSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.change-club',
        onRender: function() {
            this.$el.prepend(_.template(emailHeaderSrc));
        },

        events: {
            'keyup .js-search': 'search',
            'click .js-results li' : 'onItemClick'
        },

        search: function (e) {
            var that = this;
            var results = this.$el.find('.js-results');
            setTimeout(function () {
                results.fadeIn('slow');
            }, 600);
        },

        onItemClick: function(e) {
            var clubId =  $(e.currentTarget).data('id');
            window.location.href = '#changeClubSelection/'+clubId;
        }
    });

    return View;
});