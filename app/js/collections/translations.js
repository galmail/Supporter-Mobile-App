define([
  'underscore',
  'backbone',
  'models/i18n'
], function(_, Backbone, I18n){
	var Translations = Backbone.Collection.extend({
		model: I18n
	});
	return Translations;
});
