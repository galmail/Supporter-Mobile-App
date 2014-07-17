/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MenuLogClear.html'
], function ($, _, Backbone, templateSrc) {
    'use strict';

    //var router = Router.getInstance();

    var View = Backbone.View.extend({

        el: '#container',

        template: _.template(templateSrc),

        events: {
            'click .js-login': 'onLogin'
        },

        initialize: function () {
            this.body = this.$el.parents('body');
            this.render();
        },

        render: function () {
            this.body.addClass('body-not-logged');
            this.$el.html(_.template(templateSrc));
        },

        onLogin: function () {
            alert('login');
            // router.navigate('login', {
            //     trigger: true
            // });
        }
    });

    return View;
});