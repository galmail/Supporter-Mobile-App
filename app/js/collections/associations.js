define([
    'underscore',
    'backbone',
    'models/association'
], function (_, Backbone, Association) {
    var Associations = Backbone.Collection.extend({
        model: Association,
        
        parse: function(response){
        	return response.data;
        },
        
        getPopular: function(callback){
        	this.url = '/v2/associations/getpopular';
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
        	this.url = '/v2/associations/getbystring?string='+searchStr;
        	this.fetch({
        		success: function(collection, response, options){
            		callback(collection);
            	},
            	error: function(collection, response, options){
            		console.log('Error: ' + response);
            	}
        	});
        }
        
    });
    return Associations;
});
