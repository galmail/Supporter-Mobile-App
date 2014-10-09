define([
    'underscore',
    'backbone',
    'models/association'
], function (_, Backbone, Association) {
    var Associations = Backbone.Collection.extend({
        model: Association,
        url: 'http://dev01.supporter.com/v2/associations/getpopular'
    });
    return Associations;
});
