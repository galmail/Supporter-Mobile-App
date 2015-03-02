/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PrivacyPolicy.html',
    'views/global/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.privacy-policy',

        onRender: function (callback) {
            var $iframe = $('#iframe-privacy-policy');
            $iframe.width($iframe.parent().width());
            $iframe.height($('#container').height()-$iframe.parent().height());
            callback();
        }
    });

    return View;
});
