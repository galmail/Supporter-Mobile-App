/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/AllFilterByLeage.html',
    'text!templates/snippets/searchHeader.html'
], function ($, _, Backbone, LoggedView, templateSrc, searchHeaderSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.all-filter-by-leage',
        onRender: function (callback) {
            this.$el.prepend(_.template(searchHeaderSrc));
            this.$el.addClass('body-gradient');
            callback();
        },
        events: {
        	'click .item': 'filterByLeageSubmenuClicked'
        },
        filterByLeageSubmenuClicked: function(){
        	window.location.href='#allFilterByLeageSubmenu';
        }
    });

    return View;
});