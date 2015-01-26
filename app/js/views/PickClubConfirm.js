/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PickClubConfirm.html',
    'views/global/UnloggedView',
    'collections/associations',
    'models/user',
    'utils'
], function ($, _, Backbone, templateSrc, UnloggedView, Associations, User, Utils) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.pick-club-confirm',
        
        onInit: function(callback){
        	console.log("PickClubConfirm init");
        	var data = Associations.selectedAssociation.attributes;
        	if(!data.logo.sizes.medium){
        		data.logo.sizes.medium = { file: data.logo.file };
        	}
        	this.templateData = data;
        	callback();
        },
        
        onRender: function () {
        	console.log("PickClubConfirm render");
        	$('#confirmClubBtn').on('click',function(){
        		if(window.LoggedUser){
        			// change club
        			window.LoggedUser.changeClub(Associations.selectedAssociation,function(success){
        				if(success){
        					Utils.alert('Club Changed Successfully.',function(){
        						window.location.href = "#mainMenuLogged";
        					},'Success','Ok');
        				}
        				else {
        					Utils.alert('A communication error occured, please try again later.',null,'Error','Ok');
        				}
        			});
        			return false;
        		}
        		else {
        			return true;
        		}
        	});
            return this;
        }
    });

    return View;
});