define([
  'underscore',
  'backbone',
  'models/user',
  'collections/base'
], function(_, Backbone, User, BaseCollection){
	var Users = BaseCollection.extend({
		model: User
	});
	return Users;
});
