define([
  'underscore',
  'backbone',
  'utils'
], function(_, Backbone, Utils){
	var Operator = Backbone.Model.extend({
		defaults: {
			id: null,
			name: null,
			identifier: null,
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
	   	createAccount: function(){
	   		var self = this;
	   		this.url = Utils.buildUrl('/v2/operators/createaccount',{
        		operator: self.get('name'),
        		key: self.get('key')
        	});
        	this.save();
	   	}
	});
	return Operator;
});
