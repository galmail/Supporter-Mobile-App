define([
    'underscore',
    'backbone',
    'models/base'
], function (_, Backbone, BaseModel) {
    var Link = BaseModel.extend({
        defaults: {
            'operator': null,
            'title': null,
            'url': null
        },
        initialize: function () {
            
        }
    });
    return Link;
});
