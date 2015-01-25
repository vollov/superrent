
var _ = require("../node_modules/underscore/underscore-min");

module.exports = function(){
	return {
		/**
		 * Add Access-Control-Allow-Headers in HTTP response
		 */
		header : function(req, res, next) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Accept,Content-Type, X-Requested-With');
			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			//res.header('Access-Control-Allow-Credentials': true);
			next();
		},
	
		/**
		 * docs return from mongodb is like:
		 * [{"_id":"54a4d108228799901cb889e5","name":"Kayak"},
		 * {"_id":"54a4d108228799901cb889e6","name":"Lifejacket"}]
		 * 
		 * chenge _id to id, like:
		 * [{"name":"Kayak","id":"54a4d108228799901cb889e5"},
		 * "name":"Lifejacket","id":"54a4d108228799901cb889e6"}]
		 * 
		 * @param docs
		 */
		filterId : function(docs){
			return _.map(docs, function(value) {
				//console.log("v->%j", value._id);
				value['id'] = value._id;
				return _.omit(value, '_id');
			});
		}
	}
}
