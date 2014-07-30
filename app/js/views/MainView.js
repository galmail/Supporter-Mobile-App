/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/snippets/Main.html'
], function ($, _, Backbone, mainTpl) {
    'use strict';

    var View = Backbone.View.extend({
    	
    	el: '#container',

        // Override this
        template: null,

        initialize: function (templateSrc) {
        	console.log("MainView initialize");
            $('body').html(_.template(mainTpl));
        }
        
    });

    return View;
});