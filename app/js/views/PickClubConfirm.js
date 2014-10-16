/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PickClubConfirm.html',
    'views/UnloggedView',
    'collections/associations'
], function ($, _, Backbone, templateSrc, UnloggedView, Associations) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.pick-club-confirm',
        
        onInit: function(callback){
        	console.log("PickClubConfirm init");
        	this.templateData = Associations.selectedAssociation.attributes;
        	callback();
        },
        
        onRender: function () {
        	console.log("PickClubConfirm render");
        	
        	
            //this.$el.find('.club').css('background-image', 'url(img/clubs/large/' + this.options.clubId + '.png)');
        }
    });

    return View;
});