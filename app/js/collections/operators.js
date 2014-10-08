define([
  'underscore',
  'backbone',
  'models/operator'
], function(_, Backbone, Operator){
	var Operators = Backbone.Collection.extend({
		model: Operator
	});
	return Operators;
});
