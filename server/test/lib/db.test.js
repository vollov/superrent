'use strict';

var assert = require('assert')
  , should = require('should')
  , DB = require('../../lib/db')
  , Config = require('../../lib/config');

var test_config = Config().getTestConfig();
var db = DB(test_config);

describe('Test mysql wrapper -- db module', function() {
	
	describe('Test find function', function() {
		// console.log('Start test find function...');
		it('should find 3 users in test db', function(done) {
			
			db.connect(function(err, connection){
				connection.query( 'SELECT email,phone FROM user', function(err, users, fields) {
					connection.release();
					should.not.exist(err);
					//console.log('users => %j ', users.length);
					//console.log('fields => %j ', fields);
					users.should.have.lengthOf(3);
					done();
				})
			});
		});
	});
	
	
	/**
	 * return images whose property_id is in pid_list
	 */
	var getImages = function(pid_list, callback) {
		
		db.connect(function(err, connection){
			//console.log('connect err=%j', err);
			connection.query( 'SELECT * FROM image i where i.property_id in ?',[pid_list], function(err, docs) {
				//console.log('connect db=%j', pid_list);
				connection.release();
				callback(err, docs);
			})
		})
	}
	
	describe('Test  callback find function', function() {
		// console.log('Start test find function...');
		it('should find images in test db', function(done) {
			var p_list = [[1,3]];

			getImages(p_list, function(err, data){
				should.not.exist(err);
				//console.log('users => %j ', users.length);
				//console.log('fields => %j ', fields);
				data.should.have.lengthOf(13);
				
				done();
			});

			
		});
	});
});
