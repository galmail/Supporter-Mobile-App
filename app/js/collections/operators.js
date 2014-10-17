define([
  'underscore',
  'backbone',
  'models/operator'
], function(_, Backbone, Operator){
	var Operators = Backbone.Collection.extend({
		model: Operator,
		
		parse: function(response){
        	return response.data;
        },
        
		getAvailable: function(callback){
			this.url = '/v2/operators/listavailable?session='+localStorage.getItem('session');
			this.fetch({
				success: function(collection, response, options){
					window.x = collection;
            		callback(collection);
            	},
            	error: function(collection, response, options){
            		console.log('Error: ' + response);
            	} 
			});
		}
	});
	return Operators;
});
