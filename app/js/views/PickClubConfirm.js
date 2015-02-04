/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PickClubConfirm.html',
    'views/global/UnloggedView',
    'collections/associations',
    'models/user',
    'utils',
    'models/i18n'        
], function ($, _, Backbone, templateSrc, UnloggedView, Associations, User, Utils, I18n) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.pick-club-confirm',

 //Add translation
        initialize: function () {
        	var self = this;
            this.onInit(function(){
            	// before render, add to templateData the language translation
            	if(I18n.transData!==null){
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
        //End translation

        
        onInit: function(callback){
        	console.log("PickClubConfirm init");
        	var data = Associations.selectedAssociation.attributes;
        	if(!data.logo.sizes.medium){
        		data.logo.sizes.medium = { file: data.logo.file };
        	}
        	this.templateData = data;
        	callback();
        },
        
        onRender: function (callback) {
        	console.log("PickClubConfirm render");
        	var self = this;
        	$('#confirmClubBtn').on('click',function(){
        		if(window.LoggedUser){
        			// change club
        			window.LoggedUser.changeClub(Associations.selectedAssociation,function(success){
        				if(success){
        					Utils.alert(self.templateData.i18n.ClubChangedSuccessfully,function(){
        						window.location.href = "#mainMenuLogged";
        					},self.templateData.i18n.Success,self.templateData.i18n.Ok);
        				}
        				else {
        					Utils.alert(self.templateData.i18n.communicationerror,null,self.templateData.i18n.Error,self.templateData.i18n.Ok);
        				}
        			});
        			return false;
        		}
        		else {
        			return true;
        		}
        	});
            callback();
        }
    });

    return View;
});