define([
    'underscore',
    'backbone',
    'models/base'
], function (_, Backbone, BaseModel) {
    var Category = BaseModel.extend({
        defaults: {
            'title': null,
            'icon': null,
            'links': []
        },
        initialize: function () {
            //console.log('New Category Created.');
        }
    });
    return Category;
});
