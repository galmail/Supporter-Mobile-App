/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/CreateNewAccountConfirmation.html',
    'views/global/UnloggedView',
    'collections/associations'
    // 'models/user',
    // 'utils'
], function ($, _, Backbone, templateSrc, UnloggedView, Associations) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.create-new-account-confirmation',
        events: {
        	//'click #createButton': 'createAccountConfirmation'
        },
        
        onInit: function(callback){
        	console.log("CreateNewAccountConfirm init");
        	var data = Associations.selectedAssociation.attributes;
        	// if(!data.logo.sizes.medium){
        		// data.logo.sizes.medium = { file: data.logo.file };
        	// }
        	this.templateData = data;
        	callback();
        },
        
        
        
        createAccountConfirmation: function(){
        	// validate email and password
        	
        }
        
    });

    return View;
});