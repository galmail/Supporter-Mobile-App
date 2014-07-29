/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/LoggedView',
    'text!templates/UserSettings.html'
], function ($, _, Backbone, LoggedView, templateSrc) {
    'use strict';

    var View = LoggedView.extend({
        template: _.template(templateSrc),
        events: {
            'click .options div' : 'onItemClick',
            'click .buttons div' : 'onItemClick'
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