/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'views/UserProfileView',
    'text!templates/UserProfile.html'
], function ($, _, Backbone, UserProfileView, templateSrc) {
    'use strict';

    var View = UserProfileView.extend({
        template: _.template(templateSrc)
    });

    return View;
});