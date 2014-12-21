define([
    'underscore',
    'backbone',
    'models/link',
    'utils',
    'collections/base',
    'models/i18n'
], function (_, Backbone, Link, Utils, BaseCollection, I18n) {
    var Links = BaseCollection.extend({
        model: Link
    },
    // static properties
    {
    	selectedLink: null
    });
    return Links;
});
