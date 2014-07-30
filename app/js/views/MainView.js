/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/snippets/Main.html'
], function ($, _, Backbone, mainTpl) {
    'use strict';

    var View = Backbone.View.extend({

        el: "#container",

        // Override this
        template: null,

        // Override this
        navbar: false,

        // Override this
        events: {
        },

        initialize: function (templateSrc) {
            this.body = $('body');
            this.render(templateSrc);
            this.preInit();
        },

        render: function (templateSrc) {
        	this.body.prepend(_.template(mainTpl));
        	this.setNavBar();
        	$("#container").html(this.template(templateSrc));
            this.preRender();
        },
        
        setNavBar: function(){
        	var $navbar = $('.js-navbar nav.tab-bar');
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
        preInit: function() {},

        // Override this
        preRender: function() {}
    });

    return View;
});