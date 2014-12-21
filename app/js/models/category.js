define([
    'underscore',
    'backbone',
    'models/base',
    'collections/links'
], function (_, Backbone, BaseModel, Links) {
    var Category = BaseModel.extend({
        defaults: {
            'title': null,
            'icon': null,
            'links': []
        },
        initialize: function () {
            //console.log('New Category Created.');
        },
        setLinks: function(){
        	var linksCollection = new Links(this.get('links'));
        	this.set('links',linksCollection);
        }
        
    });
    return Category;
});
