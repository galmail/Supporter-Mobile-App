/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/NewAccountEnd.html',
    'views/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        unifiedRegStep: 3
    });

    return View;
});