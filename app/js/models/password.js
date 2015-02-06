define([
    'underscore',
    'backbone',
    'models/base',
    'utils'
], function (_, Backbone, BaseModel, Utils) {
    var Password = BaseModel.extend({
        defaults: {
            'email': null
        },

        initialize: function () {

        },

        parse: function(response){
        	return response.data;
        },

        requestReset: function(email, callback){
        	var self = this;
	   		this.url = Utils.buildUrl('/v2/users/requestpasswordreset', {
	   			email: email
	   		});
	   		this.$fetch({
        		success: function(model, response, options){
        			callback(true, response);
            	},
            	error: function(model, response, options){
            		console.log('Error User.pinLookUp');
            		callback(false, response);
            	}
        	});
        }

    });
    return Password;
});
