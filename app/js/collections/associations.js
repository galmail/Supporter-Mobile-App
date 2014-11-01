define([
    'underscore',
    'backbone',
    'models/association',
    'utils'
], function (_, Backbone, Association, Utils) {
    var Associations = Backbone.Collection.extend({
        model: Association,
        
        parse: function(response){
        	return response.data;
        },
        
        getPopular: function(callback){
        	this.url = Utils.buildUrl('/v2/associations/getpopular');
        	this.fetch({
        		success: function(collection, response, options){
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
        	this.fetch({
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
