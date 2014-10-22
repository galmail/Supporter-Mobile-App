/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/MainView',
    'models/i18n'
], function ($, _, Backbone, MainView, I18n) {
    'use strict';

    var View = MainView.extend({

        navbar: true,

		initialize: function() {
			console.log('LoggedView initialize');
        	var self = this;
            this.bindSomeEvents();
            this.onInit(function(){
            	// before render, add to templateData the language translation
            	if(I18n.transData!=null){
            		self.templateData.i18n = I18n.transData;
            		self.render();
            	}
            	else {
            		new I18n({code: I18n.locale}).load(function(model){
            			I18n.transData = model.attributes;
            			self.templateData.i18n = I18n.transData;
	            		self.render();
            		});
            	}
            });
        },
        
		bindSomeEvents: function(){
        	// refactor into events object later
            $('.search-icon').on('click', function() {
                window.location.href = '#eventsAllFilter';
            });
            $('.back-icon').on('click', function() {
                window.history.back();
            });
            $('.home-icon').on('click', function() {
                window.location.href = '#mainMenuLogged';
            });
            $('.options-icon').on('click', function() {
                window.location.href = '#userSettings';
            });
        },
        
        render: function(){
        	console.log("LoggedView render");
        	
        	this.body.addClass('body-logged');
            this.body.removeClass('body-not-logged');
            this.setNavBar();
            $(container).html(this.template(this.templateData));
            this.fixContainerHeight();
        	this.el = $(this.element);
        	this._ensureElement();
        	return this.onRender();
        },
        
        // Override this
        onInit: function() {},

        // Override this
        onRender: function() {}
    });

    return View;
});