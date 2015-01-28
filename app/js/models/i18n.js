define(['underscore', 'backbone','models/base'], function(_, Backbone, BaseModel) {
	var I18n = BaseModel.extend({
		//storeName: 'I18n',
		defaults: {
			code: null,
			lang: null
		},
		initialize: function() {
			
		},
		load: function(callback) {
			var self = this;
			var domain = window.staticCDN || ''; 
			this.url = domain + '/lang/'+ this.get('code') +'/strings.json?nocache='+Math.random();
        	this.$fetch({
        		success: function(obj, response, options){
            		callback(obj);
            	},
            	error: function(collection, response, options){
            		console.log('Error getting lang='+self.get('code')+' ..getting default lang=sv');
            		if(self.get('code')!='sv'){
            			self.set('code','sv');
            			self.load(callback);
            		}
            	}
        	});
		}
	},
	// static properties
	{
		locale: navigator.languages[0] || navigator.language,		
		transData: null
	
	});
	return I18n;
});
