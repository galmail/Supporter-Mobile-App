/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/UserSettings.html',
    'text!templates/snippets/EmailHeader.html'
], function ($, _, Backbone, LoggedView, templateSrc, emailHeaderSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        element: '.user-settings',
        events: {
            'click .options li' : 'onItemClick',
            'click .buttons div' : 'onItemClick'
        },
        onRender: function() {
            this.$el.prepend(_.template(emailHeaderSrc));
        },
        onItemClick: function(e) {
        	var target = e.currentTarget.id;
        	if(target == "signOut"){
        		$('#logoutConfirmModal').show();
        		$('.modal-bg').show();
        	}
        	else if (target == "closeModal"){
        		$('#logoutConfirmModal').hide();
        		$('.modal-bg').hide();
        	}
        	else {
        		window.location.href = '#' + target;
        	}
        }

    });

    return View;
});