/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/MainView',
    'text!templates/snippets/UnifiedRegistration.html',
    'models/i18n'
], function ($, _, Backbone, MainView, unifiedRegistrationSrc, I18n) {
    'use strict';

    var View = MainView.extend({

    	navbar: false,

        unifiedRegStep: null,

        initialize: function () {
        	console.log("UnloggedView onInitialize");
        	var self = this;
            this.unifiedRegSteps();
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
        
        unifiedRegSteps: function(){
        	if (this.unifiedRegStep !== null) {
                $(container).prepend(_.template(unifiedRegistrationSrc, {
                    step: this.unifiedRegStep,
                    total: 3
                }));
            }
        },
        
        render: function(){
        	console.log("UnloggedView render");
        	var self = this;
        	this.body.addClass('body-not-logged');
            this.body.removeClass('body-logged');
            this.setNavBar();
            $(container).html(this.template(this.templateData));
            //this.fixContainerHeight();
        	this.el = $(this.element);
        	this._ensureElement();
        	this.onRender(function(){
        		self.fixContainerHeight();
        		return self;
        	});
        },

        // Override this
        onInit: function(callback) { callback(); },

        // Override this
        onRender: function(callback) { callback(); }
        
    });

    return View;
});