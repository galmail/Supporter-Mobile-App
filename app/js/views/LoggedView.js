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
            this.body = this.$el.parents('body');
            this.render(templateSrc);
            this.onInit();

            // refactor into events object later
            $('.js-search').on('click', function() {
                window.location.href = '#eventsAllFilter';
            });
        },

        render: function (templateSrc) {
        	this.setNavBar();
            this.body.addClass('body-logged');
            this.body.removeClass('body-not-logged');
            this.$el.html(this.template(templateSrc));
            this.onRender();
        },

        setNavBar: function(){
        	var $navbar = $('.js-navbar');
        	if (this.navbar) {
                $navbar.show();
            }
            else {
                $navbar.hide();
            }
        },

        setContainerHeight: function() {
            var $body   = $('body');
            if (this.navbar) {
                this.$el.css('max-height', ($body.height() - $navbar.height()) + 'px');
            }
            else {
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