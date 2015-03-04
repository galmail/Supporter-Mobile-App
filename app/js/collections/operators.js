define([
  'underscore',
  'backbone',
  'models/operator',
  'utils',
  'collections/base'
], function(_, Backbone, Operator, Utils, BaseCollection){
	var Operators = BaseCollection.extend({
		model: Operator,

		parse: function(response){
        	return response.data;
        },

		getAvailable: function(callback){
			this.url = Utils.buildUrl('/v2/operators/listavailable');
			this.$fetch({
				success: function(collection, response, options){
            		callback(collection);
            	},
            	error: function(collection, response, options){
            		console.log('Error: ' + response);
            	}
			});
		},

		getActivatedOperators: function(callback){
			this.url = Utils.buildUrl('/v2/users/operators');
			this.$fetch({
				success: function(collection, response, options){
            		callback(collection);
            	},
            	error: function(collection, response, options){
            		console.log('Error: ' + response);
            	}
			});
		},

		setStatus: function(operator,status){
			this.where({id: operator.id})[0].set('status',status);
		}

	},
	// static properties
	{
		SelectedOperator: {},
		ActivatedOperators: null,

		getActiveOperators: function(callback){
			var self = this;
			var allOps = new Operators();
			var activeOps = new Operators();
			
			allOps.getAvailable(function(){
				activeOps.getActivatedOperators(function(){
					activeOps.each(function(op){
						allOps.where({identifier: op.get('identifier')})[0].set('status',op.get('status'));
						allOps.where({identifier: op.get('identifier')})[0].set('username',op.get('username'));
						allOps.where({identifier: op.get('identifier')})[0].set('password',op.get('password'));
						allOps.where({identifier: op.get('identifier')})[0].set('generosity',op.get('generosity'));
					});
					self.ActivatedOperators = allOps;
					callback(allOps);
				});
			});
		}
		

	});
	Operators.ActivatedOperators = new Operators();
	return Operators;
});
