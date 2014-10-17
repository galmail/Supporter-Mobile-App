define(['underscore', 'backbone'], function(_, Backbone) {
	var I18n = Backbone.Model.extend({
		defaults: {
			code: null,
			lang: null
		},
		initialize: function() {
			
		},
		load: function(callback) {
			this.url = '/lang/'+ this.get('code') +'/strings.json';
        	this.fetch({
        		success: function(obj, response, options){
            		callback(obj);
            	},
            	error: function(collection, response, options){
            		console.log('Error: ' + response);
            	}
        	});
		}
	});
	return I18n;
});
