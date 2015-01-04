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
        }
        
    });
    return Association;
});
