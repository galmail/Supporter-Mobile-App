/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PickClubConfirm.html',
    'views/UnloggedView'
], function ($, _, Backbone, templateSrc, UnloggedView) {
    'use strict';

    var View = UnloggedView.extend({
        template: _.template(templateSrc),

        onRender: function () {
            this.$el.find('.club').css('background-image', 'url(img/clubs/large/' + this.options.clubId + '.png)');
        }
    });

    return View;
});