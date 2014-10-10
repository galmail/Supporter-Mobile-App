define([
    'underscore',
    'backbone',
    'models/association'
], function (_, Backbone, Association) {
    var Associations = Backbone.Collection.extend({
        model: Association,
        url: '/v2/associations/getpopular',
        parse: function(response){
        	return response.data;
        }
    });
    return Associations;
});
