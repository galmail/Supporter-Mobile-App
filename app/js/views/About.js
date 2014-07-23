/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/About.html',
    'text!templates/Navbar.html'
], function ($, _, Backbone, templateSrc, navbarSrc) {
    'use strict';

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(templateSrc),

        events: {},

        initialize: function () {
            this.body = this.$el.parents('body');
            this.render();

        },

        render: function () {
            this.body.addClass('body-not-logged');
            this.$el.html(_.template(templateSrc));
            $('body').prepend(_.template(navbarSrc));
        }
    });

    return View;
});