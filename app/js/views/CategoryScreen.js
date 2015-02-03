/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/global/LoggedView',
    'text!templates/CategoryScreen.html',
    'collections/categories',
    'collections/links',
    'text!templates/snippets/CategoryScreenLink.html',
    'utils'
], function ($, _, Backbone, LoggedView, templateSrc, Categories, Links, TemplateLink, Utils) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.category-screen',
        collection: new Links(),
        
        onInit: function(callback){
        	this.templateData = Categories.selectedCategory.attributes;
        	this.collection = Categories.selectedCategory.get('links');
        	callback();
        },
        
        onRender: function(callback){
        	var self = this;
        	this.body.addClass('body-not-logged');
        	var results = this.$el.find('#operatorsLinkList');
        	this.renderCollection(this.collection, results, TemplateLink);
        	
        	// bind link onclick event
        	$('.cat-link > a').on('click',function(el){
        		self.openOperatorApp(el,self);
        		return false;
        	});
        	// bind close frame event
        	$('#closeFrameIcon').on('click',function(el){
        		self.closeOperatorApp(el,self);
        		return false;
        	});
        	callback();
        },
        
        closeOperatorApp: function(el,self){
        	console.log('closing app');
        	$('#closeFrameIcon').hide();
        	var iframe = $('#inAppBrowser');
        	iframe[0].contentWindow.document.cookie='';
        	iframe.attr('src','');
        	iframe.hide();
        },
        
        openOperatorApp: function(el,self){
        	console.log('open operator page: ' + el.currentTarget.id);
        	var link = self.collection.searchByName(el.currentTarget.id);
        	link.loadAuthTokens(function(ok,model){
        		if(ok){
        			// setup cookies and open page
        			var success = false;
        			var auth = 'auth=' + model.get('auth') + ';';
        			var iframe = $('#inAppBrowser');
        			
        			iframe.on('load',function(){
        				if(iframe[0].contentWindow.document.cookie.indexOf('auth')>=0) return false;
        				console.log('iFrame has loaded.. inject auth cookie and reload');
        				iframe[0].contentWindow.document.cookie=auth;
        				iframe[0].contentWindow.location.reload();
        			});
        			
        			iframe.attr('src', model.get('url'));
        			
        			Utils.showLoading(3000,function(){
			        	iframe.show();
			        	$('#closeFrameIcon').show();
			        });
        		}
        	});
        }
    });

    return View;
});