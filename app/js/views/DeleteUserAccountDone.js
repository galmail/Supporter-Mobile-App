/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/DeleteUserAccountDone.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        
        onInit: function(){
        	$('.js-navbar').hide();
        }
    });

    return View;
});