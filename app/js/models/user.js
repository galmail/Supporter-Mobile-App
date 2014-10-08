User = Backbone.Model.extend({
	defaults: {
		email: null,
		password: null,
		association: null,
        name: null
    },
	initialize: function(){
        console.log("New User Created.");
    }
});