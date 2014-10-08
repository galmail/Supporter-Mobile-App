define([
  'underscore',
  'backbone'
], function(_, Backbone){
	var Association = Backbone.Model.extend({
		defaults: {
			
		},
		initialize: function(){
	        console.log("New Association Created.");
	    }
	});
	return Association;
});
