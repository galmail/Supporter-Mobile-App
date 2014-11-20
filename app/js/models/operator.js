define([
  'underscore',
  'backbone',
  'utils',
  'models/base'
], function(_, Backbone, Utils, BaseModel){
	var Operator = BaseModel.extend({
		defaults: {
			id: null,
			name: null,
			identifier: null,
			status: 'pending', // status: {pending, success, error}
			logo: {
				width: null,
				height: null,
				file: null,
				sizes: {
					thumbnail: {
						file: null,
						width: null,
						height: null,
						'mime-type': null
					},
					medium: {
						file: null,
						width: null,
						height: null,
						'mime-type': null
					}
				}
			},
			terms_url: null,
			generosity: {
				new_account: null,
				existing_account: null
			}
		},
		initialize: function(){
	        //console.log("New Operator Created.");
	   	},
	   	createAccount: function(callbacks){
	   		var self = this;
	   		this.url = Utils.buildUrl('/v2/operators/createaccount',{
        		operator: self.get('name'),
        		key: self.get('key')
        	});
        	this.$save(null,callbacks);
	   	},
	   	connectAccount: function(credentials,callbacks){
	   		var self = this;
	   		this.url = Utils.buildUrl('/v2/operators/registerexisting',{
        		operator: self.get('name'),
        		key: self.get('key')
        	});
        	this.$save(credentials,callbacks);
	   	}
	});
	return Operator;
});
