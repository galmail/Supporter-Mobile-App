define([
  'underscore',
  'backbone',
  'models/operator',
  'utils',
  'collections/base'
], function(_, Backbone, Operator, Utils, BaseCollection){
	var Operators = BaseCollection.extend({
		model: Operator,
		
		parse: function(response){
        	return response.data;
        },
        
		getAvailable: function(callback){
			this.url = Utils.buildUrl('/v2/operators/listavailable');
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
		SelectedOperator: {},
		ActivatedOperators: null
	});
	Operators.ActivatedOperators = new Operators();
	return Operators;
});
