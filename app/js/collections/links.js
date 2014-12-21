define([
    'underscore',
    'backbone',
    'models/link',
    'utils',
    'collections/base',
    'models/i18n'
], function (_, Backbone, Link, Utils, BaseCollection, I18n) {
    var Links = BaseCollection.extend({
        model: Link,
        searchByName: function(name){
        	return this.where({ operator: name })[0];
        }
    },
    // static properties
    {
    	selectedLink: null
    });
    return Links;
});
