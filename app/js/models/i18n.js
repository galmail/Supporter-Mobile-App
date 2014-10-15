define(['underscore', 'backbone'], function(_, Backbone) {
	var I18n = Backbone.Model.extend({
		defaults: {
			id: 'en',
			welcome: null
		},
		initialize: function() {
			//this.url = '/translations/'+locale+'.json';
			//this.fetch();
		},
		load: function(callback) {
			callback();
			// this.url = '/v2/associations/getpopular';
        	// this.fetch({
        		// success: function(obj, response, options){
            		// callback(obj);
            	// },
            	// error: function(collection, response, options){
            		// console.log('Error: ' + response);
            	// }
        	// });
		}
	});
	return I18n;
});
