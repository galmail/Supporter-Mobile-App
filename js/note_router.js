"use strict";
window.APP = window.APP || {};
APP.NoteRouter = Backbone.Router.extend({
  routes: {
    "home": "home"
  },

  initialize: function (options) {
    this.notes = options.notes;
    // this is debug only to demonstrate how the backbone collection / models work
    this.notes.bind('reset', this.updateDebug, this);
    this.notes.bind('add', this.updateDebug, this);
    this.notes.bind('remove', this.updateDebug, this);
    this.index();
  },

  updateDebug: function () {
    $('#output').text(JSON.stringify(this.notes.toJSON(), null, 4));
  },


  home: function () {
    alert('HOME');
  },

  index: function () {
    this.currentView = new APP.NoteIndexView({
      notes: this.notes
    });
    $('#primary-content').html(this.currentView.render().el);
  }
});