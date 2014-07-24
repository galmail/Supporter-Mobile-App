/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/ChangeClubSelection.html',
    'text!templates/snippets/EmailHeader.html'
], function ($, _, Backbone, LoggedView, templateSrc, emailHeaderSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        onRender: function() {
            this.$el.prepend(_.template(emailHeaderSrc));
            this.$el.find('.club').css('background-image', 'url(img/clubs/large/' + this.options.clubId + '.png)');        }
    });

    return View;
});