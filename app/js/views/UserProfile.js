/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/UserProfile.html',
    'text!templates/snippets/EmailHeader.html'
], function ($, _, Backbone, LoggedView, templateSrc, emailHeaderSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        events: {
            'click .options li' : 'onItemClick'
        },
        onItemClick: function(e) {
            window.location.href = '#' + e.currentTarget.id;
        },
        onRender: function() {
            this.$el.find('.user-profile').prepend(_.template(emailHeaderSrc));
        }
    });

    return View;
});