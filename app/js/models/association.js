define([
  'underscore',
  'backbone'
], function(_, Backbone){
	var Association = Backbone.Model.extend({
		defaults: {
			"id": null,
	      	"name": null,
	      	"sport": null,
	      	"logo": "default_club.png",
	      	"csv_id": null,
	      	"borough": null
		},
		initialize: function(){
	        console.log("New Association Created.");
	    }
	});
	return Association;
});
