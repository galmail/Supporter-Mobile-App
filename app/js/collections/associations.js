define([
    'underscore',
    'backbone',
    'models/association',
    'utils',
    'collections/base'
], function (_, Backbone, Association, Utils, BaseCollection) {
    var Associations = BaseCollection.extend({
        model: Association,
        
        parse: function(response){
        	return response.data;
        },
        
        getPopular: function(callback){
        	this.url = Utils.buildUrl('/v2/associations/getpopular');
        	this.$fetch({
        		success: function(collection, response, options){
            		window.debugme = collection;
            		callback(collection);
            	},
            	error: function(collection, response, options){
            		console.log('Error: ' + response);
            	}
        	});
        },
        
        search: function(searchStr, callback){
        	this.url = Utils.buildUrl('/v2/associations/getbystring',{
        		string: searchStr
        	});
        	this.$fetch({
        		success: function(collection, response, options){
            		callback(collection);
            	},
            	error: function(collection, response, options){
            		console.log('Error: ' + response);
            	}
        	});
        }
        
    },
    // static properties
    {
    	selectedAssociation: null
    });
    return Associations;
});
