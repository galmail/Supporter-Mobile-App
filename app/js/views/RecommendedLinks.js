/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/RecommendedLinks.html',
    'views/global/LoggedView'
], function ($, _, Backbone, templateSrc, LoggedView) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.recommended-links'
    });

    return View;
});
