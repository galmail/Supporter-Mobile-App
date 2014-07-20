/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PickClubConfirm.html'
], function ($, _, Backbone, templateSrc) {
    'use strict';

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(templateSrc),

        events: {
        },

        initialize: function () {
            this.body = this.$el.parents('body');
            this.clubId = this.options.clubId;
            this.render();
        },

        render: function () {
            this.body.addClass('body-not-logged');
            this.$el.html(_.template(templateSrc));
            console.info('MSG',  this.$el.find('.club'));
            this.$el.find('.club').css('background-image', 'url(../img/clubs/large/'+this.clubId+'.png)');

        }
    });

    return View;
});