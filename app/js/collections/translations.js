define([
  'underscore',
  'backbone',
  'models/i18n',
  'collections/base'
], function(_, Backbone, I18n, BaseCollection){
	var Translations = BaseCollection.extend({
		model: I18n
	});
	return Translations;
});
