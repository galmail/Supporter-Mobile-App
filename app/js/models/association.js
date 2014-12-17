define([
    'underscore',
    'backbone',
    'models/base',
    'utils'
], function (_, Backbone, BaseModel, Utils) {
    var Association = BaseModel.extend({
        defaults: {
            'id': null,
            'name': null,
            'sport': null,
            'csv_id': null,
            'borough': null,
            'logo': {
            	width: null,
            	height: null,
            	file: null,
            	sizes: {
            		thumbnail: {
            			file: null,
            			width: null,
            			height: null,
            			'mime-type': "image/png"
            		},
            		medium: {
            			file: null,
            			width: null,
            			height: null,
            			'mime-type': "image/png"
            		}
            	}
            }
        },
        initialize: function () {
            //console.log('New Association Created.');
        },
        parse: function(response){
        	return response.data[0];
        },
        load: function(callback){
	   		var self = this;
	   		this.url = Utils.buildUrl('/v2/associations/' + self.get('id'));
        	this.$fetch({
        		success: function(obj, response, options){
            		callback(true);
            	},
            	error: function(obj, response, options){
            		console.log('Error: ' + response);
            		callback(false);
            	}
        	});
	   	}
        
        
        
    });
    return Association;
});
