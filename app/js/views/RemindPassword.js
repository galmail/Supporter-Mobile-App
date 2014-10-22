/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/RemindPassword.html',
    'views/global/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        element: '.remind-password'
    });

    return View;
});