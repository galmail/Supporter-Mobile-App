/*global define*/
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var View = Backbone.View.extend({

        el: '#container',

        // Override this
        template: null,

        // Override with false if no navbar for child page
        navbar: true,

        // Override this
        events: {
        },

        initialize: function (templateSrc) {

            this.setContainerHeight();
            this.body = this.$el.parents('body');
            this.render(templateSrc);

            this.onInit();
        },

        render: function (templateSrc) {
            this.body.addClass('body-logged');
            this.body.removeClass('body-not-logged');
            this.$el.html(this.template(templateSrc));

            this.onRender();
        },

        setContainerHeight: function() {
            var $navbar = $('.js-navbar');
            var $body   = $('body');

            if (this.navbar) {
                $navbar.show();
                this.$el.css('max-height', ($body.height() - $navbar.height()) + 'px');
            }
            else {
                $navbar.hide();
                this.$el.css('max-height', $body.height() + 'px');
            }
        },

        // Override this
        onInit: function() {},

        // Override this
        onRender: function() {}
    });

    return View;
});