define(['underscore', 'backbone'], function(_, Backbone) {
	var I18n = Backbone.Model.extend({
		urlRoot: '/translations',
		url: function() {
			return this.urlRoot + '/' + this.id + '.json';
		},
		initialize: function() {
			//this.url = '/translations/'+locale+'.json';
			//this.fetch();
		},
		load: function(callback) {
			this.fetch({
				success: callback
			});
		}
	});
	return I18n;
});
