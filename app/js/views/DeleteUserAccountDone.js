/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/UnloggedView',
    'text!templates/DeleteUserAccountDone.html'
], function ($, _, Backbone, UnloggedView, templateSrc) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),
        onRender: function () {
            this.body.addClass('body-not-logged');
        }
    });

    return View;
});