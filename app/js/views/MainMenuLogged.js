/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MainMenuLogged.html'
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
        },

        render: function () {
            this.body.removeClass('body-not-logged');
            this.$el.html(_.template(templateSrc));
        }
    });

    return View;
});