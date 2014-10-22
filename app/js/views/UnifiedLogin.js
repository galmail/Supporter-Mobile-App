/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/UnifiedLogin.html',
    'views/global/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.unified-login',
        unifiedRegStep: 2,

        events: {
            'keyup .js-ssn': 'onSsn',
        },
        onSsn: function () {
            // fill out the form
        }
    });

    return View;
});