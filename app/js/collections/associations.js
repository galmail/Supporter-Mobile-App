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
        },
        
        getById: function(id,callback){
	   		var self = this;
	   		this.url = Utils.buildUrl('/v2/associations/' + id);
        	this.$fetch({
        		success: function(collection, response, options){
        			callback(collection.first());
            	},
            	error: function(collection, response, options){
            		console.log('Error: ' + response);
            		callback(null);
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
