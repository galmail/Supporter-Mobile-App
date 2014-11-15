/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ClubDisclaimer.html',
    'views/global/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.club-disclaimer',

        onRender: function () {
            var $iframe = $('#iframe-terms-and-conditions');
            $iframe.width($iframe.parent().width());
            $iframe.height($('#container').height()-$iframe.parent().height());
            
            // bind back button event
            //$('.back-icon').on('click', this.goBack);
            //$('#joinOperatorBtn').on('click', this.joinOperator);
        }
    });

    return View;
});