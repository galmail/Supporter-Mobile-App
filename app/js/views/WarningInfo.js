/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/WarningInfo.html',
    'views/global/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.warning-info',
        unifiedRegStep: 3
    });

    return View;
});