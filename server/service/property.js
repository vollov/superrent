var DB = require('../lib/db.js');
var Utils = require("../lib/utils");
var async = require('async');

/**
 * Module handle DB access to support API
 */
module.exports = function(config) {
	
	var db = DB(config);
	var util = Utils();
	return {
		
		getProperties : function(callback){
			db.connect(function(err, connection){
				connection.query( 'SELECT *, p.active as status FROM user u, '+
						'property p where p.owner_id = u.id', function(err, docs) {
					connection.release();
					var p = util.removeFields(docs, ['password','active','latitude','longitude']);
					callback(err, p);
				})
			});
		},
		
		getPropertyDetail : function(pid, callback){
			
			async.waterfall([
			//get the property by id 
			function(callback) {
				db.connect(function(err, connection){
					connection.query( 'SELECT *, p.id as pid, p.active as status FROM user u, '+
							'property p where p.owner_id = u.id and ' + 
							'p.id=?', pid, function(err, docs) {
						connection.release();
						if (err) {
							console.log('err1 => %j ', err);
						}
						callback(err, docs);
					})
				});
			}, 
			//
			function(property, callback) {
				// fetch property id from property
				console.log('property => %j ', property[0].pid);
				var pid = property[0].pid;
				
				// query image table
				db.connect(function(err, connection){
					connection.query( "SELECT * FROM image i WHERE i.property_id = ? ", [pid],
						function(err, docs) {
							connection.release();
							if (err) {
								console.log('err2 => %j ', err);
							}
							callback(err, docs, property);
						})
				});
				
			}], function(err, images, property) {
//				if (err) {
//					throw err;
//				}
				var p = util.removeFields(property, ['password','active','latitude','longitude']);
				var rimage = util.keepFields(images, ['name','title']);
				
				p[0].images = rimage;
				var result = p[0];
//				if (!err) {
//					console.log('property => %j ', property);
//					console.log('images => %j ', images);
//				} else {
//					console.log('err => %j ', err);
//				}
				callback(err, result);
			});
			
		}
		
	}
}