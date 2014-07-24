/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/UserSettingsView',
    'text!templates/UserSettings.html'
], function ($, _, Backbone, UserSettingsView, templateSrc) {
    'use strict';

    var View = UserSettingsView.extend({
        template: _.template(templateSrc)
    });

    return View;
});