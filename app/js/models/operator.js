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
			status: 'not-selected', // status: {not-selected, pending, success, error}
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
        		operator: self.get('identifier') //name
        		//key: self.get('key')
        	});
        	this.$save(null,callbacks);
	   	},
	   	connectAccount: function(credentials,callbacks){
	   		var self = this;
	   		this.url = Utils.buildUrl('/v2/operators/registerexisting',{
        		operator: self.get('identifier') //name
        		//key: self.get('key')
        	});
        	this.$save(credentials,callbacks);
	   	},
	   	getStatusIcon: function(){
	   		var icon = null;
	   		switch(this.get('status')){
	   			case 'UNCONNECTED':
	   				icon = 'fa-unlink';
	   				break;
	   			case 'FAILED_SIGNIN':
	   				icon = 'fa-info-circle';
	   				break;
	   			case 'FAILED_CREATE':
	   				icon = 'fa-info-circle';
	   				break;
	   			case 'CONNECTED':
	   				icon = 'fa-check';
	   				break;
	   			case 'CHANGED_PASSWORD':
	   				icon = 'fa-info-circle';
	   				break;
	   			default:
	   				icon = 'unknown';
	   		}
	   		return icon;
	   	}
	});
	return Operator;
});
