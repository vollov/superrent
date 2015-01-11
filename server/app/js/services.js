'use strict';

var api_host_url = 'http://localhost:3000';

angular.module('appServices', [ ])
	.factory('Setting', function($http, $q) {
		var deffered = $q.defer();
		var settingService = {}; 
		
		// define functions in the service
		settingService.query = function(){
			$http.get(api_host_url +'/api/setting/1').success(function(data){
				localStorage.setting = JSON.stringify(data);
				deffered.resolve();
			});
			return deffered.promise;
		};
		
		// return null if setting is not set
		settingService.getSetting = function(){
			if(localStorage.getItem('setting') === null){
				return null;
			}else{
				return JSON.parse(localStorage.setting);
			}
		};
		
		settingService.save = function(s){
			$http.put(api_host_url +'/api/setting/1',s).success(function(data){
				localStorage.setting = JSON.stringify(data);
				deffered.resolve();
			});
			return deffered.promise;
		};
		
		return settingService;
	})
	.factory('PostCode', function($http){
		return {
			query : function(segment, successCallBack){
				// return a future object
				return $http.get(api_host_url + '/api/postcodes/'+ segment)
					.success(successCallBack);
			},
			get : function(id, successCallBack) {
				return $http.get(api_host_url + '/api/postcode/'+ id)
				.success(successCallBack);
			},
			total : function(successCallBack){
				return $http.get(api_host_url + '/api/count/postcode')
					.success(successCallBack);
			},
			save : function(postcode, successCallBack){
//				return $http.post(api_host_url + '/api/vehicles', vehicle, {params: {'tid': tokenid}})
//				.success(successCallBack);
			},
			update : function(postcode,successCallBack){
				return $http.put(api_host_url + '/api/postcode/'+ postcode._id, postcode)
				.success(successCallBack);
			},
			remove : function(id,successCallBack){
//				return $http.delete(api_host_url + '/api/vehicles/'+vid, {params: {'tid': tokenid}})
//				.success(successCallBack);
				return null;
			},
			getPage : function(page_id, postcodes, pageSize){
				var page = _.first(postcodes, page_id * pageSize);
				return _.last(page, pageSize);
			},
			// check if next segment is avaliable.
			hasNextSegment : function(total_records, postcodes_length, segment, pageSize, pagePerSegment){
				var fetched_records = (segment - 1) * pageSize * pagePerSegment + postcodes_length;
				console.log('fetched_records=' + fetched_records);
				console.log('total=' + total_records);
				if(total_records > fetched_records){
					return true;
				} else {
					return false;
				}
			},
			getPageList : function(postcodes_length, segment, pageSize, pagePerSegment){
				console.log('type postcodes=%j, type(pageSize)=%j',typeof postcodes,typeof pageSize);
				console.log('size='+ Math.ceil(postcodes_length/pageSize));
				if(segment == 1){
					return _.map(_.range(1, Math.ceil(postcodes_length/pageSize) + 1),
							function(index){
						return {id:index, label:index};
					});
				} else {
					return _.map(_.range(1, Math.ceil(postcodes_length/pageSize) + 1),
							function(index){
								return {id:index,
									label:index + (segment - 1) * pagePerSegment};
					});
				}
			}
		}
	});

//angular.module('appServices', [ ])
//	.factory('Setting', function($http, $q) {
//		var deffered = $q.defer();
//		var settingService = {}; 
//		
//		// define functions in the service
//		settingService.async = function(){
//			$http.get(api_url_root +'/api/setting/1').success(function(data){
//				localStorage.setting = JSON.stringify(data);
//				deffered.resolve();
//			});
//			return deffered.promise;
//		};
//		
//		// return null if setting is not set
//		settingService.get = function(){
//			if(localStorage.getItem('setting') === null){
//				return null;
//			}else{
//				return JSON.parse(localStorage.setting);
//			}
//		};
//		
//		settingService.save = function(s){
//			$http.put(api_url_root +'/api/setting/1',s).success(function(data){
//				localStorage.setting = JSON.stringify(data);
//				deffered.resolve();
//			});
//			return deffered.promise;
//		};
//		
//		return settingService;
//	})
//	.factory('PostCode', function($http, $q){
//		var deffered = $q.defer();
//		var postcodeService = {} ;
//
//		/**
//		 * define functions
//		 */
//		// Total number of records, return {total: 4433}
//		postcodeService.total = function(){
//			$http.get(api_url_root +'/api/postcode/count').success(function(data){
//				localStorage.postcode_count = data.total;
//				deffered.resolve();
//			});
//			return deffered.promise;
//		};
//		
//		// get a segment of post codes
//		postcodeService.async = function(segment){
//			$http.get(api_url_root +'/api/postcodes/'+ segment).success(function(data){
//				localStorage.postcodes = JSON.stringify(data);
//				localStorage.currentSegment = segment;
//				deffered.resolve();
//			});
//			return deffered.promise;
//		};
//		
//		postcodeService.getPostCodes = function(){
//			if(localStorage.getItem('postcodes') === null){
//				return null;
//			}else{
//				return JSON.parse(localStorage.postcodes);
//			}
//		};
//		
//		postcodeService.getTotal = function(){
//			if(localStorage.getItem('postcode_count') === null){
//				return null;
//			}else{
//				return localStorage.postcode_count;
//			}
//		};
//		
//		postcodeService.getPage = function(i, recordsPerPage){
//			var postcodes = JSON.parse(localStorage.postcodes);
//			var page = _.first(postcodes, i * recordsPerPage);
//			page = _.last(page, recordsPerPage);
//			return page;
//		};
//	})
//	.factory('PageService', function(Setting){
//		var setting = Setting.get();
//		return {
//			// check if next segment exists

//		}
//	});


//	.factory('User', function($http){
//		var users = [];
//		
//		$http.get(api_host_url + '/api/users').success(function(data, status, headers, config) {
//			users = data;
//		});
//		
//		return {
//			query: function(){
//				return users;
//			},
//			get: function(key){
//				return users[key];
//			}
//		}
//	});

//
//app.service('userService', function() {
//	  this.userData = {yearSetCount: 0};
//
//	  this.user = function() {
//	        return this.userData;
//	  };
//
//	  this.setEmail = function(email) {
//	        this.userData.email = email;
//	  };
//
//	  this.getEmail = function() {
//	        return this.userData.email;
//	  };
//
//	  this.setSetCount = function(setCount) {
//	        this.userData.yearSetCount = setCount;
//	  };
//
//	  this.getSetCount = function() {
//	        return this.userData.yearSetCount;
//	  };
//	});