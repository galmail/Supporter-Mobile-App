define([
  'underscore',
  'backbone',
  'models/association'
], function(_, Backbone, Association){
	var Associations = Backbone.Collection.extend({
		model: Association
	});
	return Associations;
});
