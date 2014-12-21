define([
    'underscore',
    'backbone',
    'models/base',
    'utils'
], function (_, Backbone, BaseModel, Utils) {
    var Link = BaseModel.extend({
        defaults: {
            'operator': null,
            'title': null,
            'url': null,
            'auth': null,
            'token': null
        },
        initialize: function () {
            
        },
        parse: function(response){
        	return response.data;
        },
        loadAuthTokens: function(callback){
        	var self = this;
	   		this.url = Utils.buildUrl('/v2/operators/authtokens',{
	   			operator: self.get('operator')
	   		});
	   		this.$fetch({
        		success: function(model, response, options){
        			callback(true, model, response);
            	},
            	error: function(model, response, options){
            		console.log('Error User.pinLookUp');
            		callback(false, model, response);
            	}
        	});
        }
        
    });
    return Link;
});
