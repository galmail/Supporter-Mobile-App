
/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PickClub.html',
    'views/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        
        element: '.pick-club',

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
            window.location.href = '#pickClubConfirm/'+clubId;
        }
    });

    return View;
});