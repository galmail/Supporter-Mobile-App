/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PickClubConfirm.html',
    'views/global/UnloggedView',
    'collections/associations'
], function ($, _, Backbone, templateSrc, UnloggedView, Associations) {
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
        	
        	
            //this.$el.find('.club').css('background-image', 'url(img/clubs/large/' + this.options.clubId + '.png)');
        }
    });

    return View;
});