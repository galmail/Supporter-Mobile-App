/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/AllFilterByCountry.html',
    'text!templates/snippets/searchHeader.html'
], function ($, _, Backbone, LoggedView, templateSrc, searchHeaderSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.all-filter-by-country',
        onRender: function(callback) {
            this.$el.prepend(_.template(searchHeaderSrc));
            this.$el.addClass('body-gradient');
            callback();
        },
        events: {
        	'click .item': 'filterByLeageClicked'
        },
        filterByLeageClicked: function(){
        	window.location.href='#allFilterByLeage';
        }
    });

    return View;
});