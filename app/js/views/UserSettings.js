/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/UserSettings.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        events: {
            'click .options div' : 'onItemClick'
        },
        onItemClick: function(e) {
            window.location.href = '#' + e.currentTarget.id;
        }
        
    });

    return View;
});