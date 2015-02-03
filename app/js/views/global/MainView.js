/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/snippets/Main.html',
    'models/i18n'
], function ($, _, Backbone, mainTpl, I18n) {
    'use strict';
    
    _.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };
    
    var View = Backbone.View.extend({
    	
    	el: '#container',
    	
    	container: '#container',

    	body: $('body'),

        // Override this
        template: null,
        
        templateData: {},
        
        events: {},
        
        showSignOut: function(){
        	$('#logoutConfirmModal').show();
    		$('.modal-bg').show();
        },
        
        closeModal: function(){
        	$('#logoutConfirmModal').hide();
    		$('.modal-bg').hide();
        },
        
        signOut: function(me){
        	window.location.href = '#menuLogClear';
        	me.closeModal();
        },

        initialize: function(templateSrc) {
        	console.log('MainView initialize');
        },
        
        renderView: function(){
        	console.log('MainView renderView');
        	var self = this;
        	var tpl = _.template(mainTpl);
        	$('body').html(tpl(self.templateData));
        	// load iovation token
        	self.loadIOvationScript();
        	// bind events
        	$('#supporterSignOut').on('click',self.showSignOut);
            $('#supporterCloseModal').on('click',self.closeModal);
            $('#supporterSignOutOK').on('click',function(){
            	self.signOut(self);
            });
        },
        
        loadI18n: function(callback){
			console.log('MainView Loading i18n data');
			var tplData = {};
        	var self = this;
        	if(I18n.transData!=null){
        		tplData.i18n = I18n.transData;
        		self.templateData = tplData; 
        		callback();
        	}
        	else {
        		new I18n({code: I18n.locale}).load(function(model){
        			I18n.transData = model.attributes;
        			tplData.i18n = I18n.transData;
        			self.templateData = tplData;
            		callback();
        		});
        	}
        },
        
        loadIOvationScript: function(){
        	window.io_operation = 'ioBegin';
            window.io_bbout_element_id = 'iovationtoken';
            window.io_install_flash = false;
            window.io_install_stm = false;
        	$.getScript("https://ci-mpsnare.iovation.com/snare.js",function(){
        		//console.log($('#iovationtoken').val());
        		console.log('iovation token loaded');
        	});
        },
        
        renderCollection: function(collection, resultsElement, elementTemplate){
            if(collection!=null){
            	resultsElement.empty();
	            for (var i = 0; i < collection.length; i++) {
	                var model = collection.at(i);
	                var compiled = _.template(elementTemplate);
	                var result = compiled(model.attributes);
	                resultsElement.append($(result));
	            }
            }
        },
        
        setNavBar: function(){
        	var $navbar = $('#header');
        	var $footer = $('#footer');
        	if (this.navbar) {
                $navbar.show();
                $footer.show();
            }
            else {
                $navbar.hide();
                $footer.hide();
            }
        },

        fixContainerHeight: function(){
        	var device_height = screen.height; //$(window).height()
        	var header_height = 0;
        	var footer_height = 0;
        	if($('#header').is(':visible')){
        		header_height = $('#header').height();
        	}
        	if($('#footer').is(':visible')){
        		footer_height = $('#footer').height();
        	}
        	$('#container').height(device_height-(header_height+footer_height));
        }
        
        
        
    });

    return View;
});