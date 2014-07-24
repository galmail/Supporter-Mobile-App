/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/UnifiedRegister.html',
    'views/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        unifiedRegStep: 2
    });

    return View;
});