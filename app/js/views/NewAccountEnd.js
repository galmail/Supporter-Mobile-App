/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/NewAccountEnd.html',
    'views/global/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.new-account-end',
        unifiedRegStep: 3
    });

    return View;
});