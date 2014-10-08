define([
  'underscore',
  'backbone'
], function(_, Backbone){
	var Operator = Backbone.Model.extend({
		defaults: {
			
		},
		initialize: function(){
	        console.log("New Operator Created.");
	    }
	});
	return Operator;
});
