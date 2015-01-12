'use strict';

var assert = require('assert')
  , should = require('should')
  , Config = require('../../lib/config');

var config = Config();

describe('Test system config module', function() {
	
	describe('Test test_db name', function() {
		it('should find test db name', function() {
			
			var db_config = config.getTestConfig();
			db_config.db_name.should.equal('rental_test');
			//console.log('test_db => %j ', test_db);
		});
	});
	
	describe('Test prod_db name', function() {
		it('should find production db name', function() {
			
			var db_config = config.getProdConfig();
			db_config.db_name.should.equal('rental');
			//console.log('test_db => %j ', test_db);
		});
	});
});