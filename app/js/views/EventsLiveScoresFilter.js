/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/EventsLiveScoresFilter.html',
    'text!templates/snippets/searchHeader.html'
], function ($, _, Backbone, LoggedView, templateSrc, searchHeaderSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.events-live-scores-filter',
        onRender: function (callback) {
            this.$el.prepend(_.template(searchHeaderSrc));
            this.$el.addClass('body-gradient');
            callback();
        },
        events: {
        	'click .item': 'eventLiveScoresClicked'
        },
        eventLiveScoresClicked: function(){
        	window.location.href='#liveScoresSubmenu';
        }
    });

    return View;
});