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
					//console.log('users => %j ', rows);
					//console.log('fields => %j ', fields);
					users.should.have.lengthOf(3);
					done();
				})
			});
		});
	});
});
