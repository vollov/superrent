'use strict';

'use strict';

var assert = require('assert')
  , should = require('should')
  , Config = require('../../lib/config')
  , Prop = require('../../service/property');

var test_config = Config().getTestConfig();
var propService = Prop(test_config);
	
describe('Test mysql wrapper -- db module', function() {
	
	describe('Test getPropertyDetail function', function() {
		// console.log('Start test find function...');
		it('should find one property with images in test db', function(done) {
			propService.getPropertyDetail(1, function(err,data){
				should.not.exist(err);
				//console.log("p=>%j",data);
				done();
			});
		});
	});

	describe('Test getProperties function', function() {
		// console.log('Start test find function...');
		it('should get all properties in test db', function(done) {
			propService.getProperties(function(err,data){
				should.not.exist(err);
				data.should.have.lengthOf(4);
				//console.log("p=>%j",data);
				done();
			});
		});
	});
});
