/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ClubDisclaimer.html',
    'views/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc)
    });

    return View;
});