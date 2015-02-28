define([
    'underscore',
    'backbone',
    'models/category',
    'utils',
    'collections/base',
    'models/i18n'
], function (_, Backbone, Category, Utils, BaseCollection, I18n) {
    var Categories = BaseCollection.extend({
        model: Category,

        parse: function(response){
        	return response.categories;
        },

        load: function(callback){
        	//if(BaseModel.MenuLinks.length>0) return callback(BaseModel.MenuLinks);
			var self = this;
			var domain = window.staticCDN || '';
			this.url = domain + '/lang/'+ I18n.locale +'/links.json?nocache='+Math.random();
        	this.$fetch({
        		success: function(collection, response, options){
            		//BaseModel.MenuLinks = obj.categories;
            		callback(collection);
            	},
            	error: function(collection, response, options){
            		console.log('Error: ' + JSON.parse(response));
            	}
        	});
        },

        selectByName: function(name){
        	Categories.selectedCategory = this.where({title: name})[0];
        	Categories.selectedCategory.setLinks();
        }

    },
    // static properties
    {
    	selectedCategory: null
    });
    return Categories;
});
