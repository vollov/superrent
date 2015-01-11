'use strict';

angular.module('appControllers', [ 'ui.bootstrap','appServices' ])
	.controller('SettingCtrl',function ($scope, $location, Setting) {
		
		var setting = Setting.getSetting();
		//console.log('setting =%j',setting);
		if(setting === null) {
			Setting.query().then(function() {
				console.log('get data in controller: data');
				$scope.setting = Setting.getSetting();
			});
		} else {
			$scope.setting = setting;
		}
		
		$scope.postcode = function() {
			$location.path('/postcodes');
		};
		$scope.save = function(setting) {
			console.log('called sigup()......');
			Setting.save(setting);
		}
	})
	.controller('PostCodeEditCtrl', function($scope, $location, $routeParams, PostCode){
		PostCode.get($routeParams.id, function(data, status, headers, config) {
			$scope.postcode = data;
		});
		
		$scope.save = function(postcode){
			console.log('saving post=%j', postcode);
			PostCode.update(postcode, function(data, status, headers, config) {
				console.log('saving postcode return data=%j', data);
				$location.path('/postcodes');
			});
		};
		
	})
	.controller('PostCodeCtrl',function($scope, $location, PostCode, Setting){
		
		var setting = Setting.getSetting();
		//console.log('setting =%j',setting);
		if(setting === null) {
			Setting.query().then(function() {
				console.log('get data in controller: data');
				$scope.setting = Setting.getSetting();
			});
		} else {
			$scope.setting = setting;
		}

		PostCode.total(function(data, status, headers, config) {
			$scope.total = data.total;
		});
		
		PostCode.query(1, function(data, status, headers, config) {
			$scope.postcodeSegment = data;
			$scope.currentSegment = 1;
			$scope.previousSegment = 0
			$scope.currentPage = 1;
			
			$scope.postCodesInPage = PostCode.getPage(1, $scope.postcodeSegment, $scope.setting.recordsPerPage);
			$scope.pageList = PostCode.getPageList($scope.postcodeSegment.length,1, $scope.setting.recordsPerPage, $scope.setting.pagesPerSegment);
			
			$scope.hasNext = PostCode.hasNextSegment($scope.total, $scope.postcodeSegment.length,1,
					$scope.setting.recordsPerPage, $scope.setting.pagesPerSegment);
		});
		
		$scope.getPage = function(page_id){
			//console.log('getPage =' + typeof pageNumber);
			$scope.postCodesInPage = PostCode.getPage(page_id, $scope.postcodeSegment, $scope.setting.recordsPerPage);
			$scope.currentPage = page_id + ($scope.currentSegment - 1)*$scope.setting.pagesPerSegment;
		};
		
		$scope.edit = function(id){
			$location.path('/postcode/' + id);
		};
		
		$scope.fetchSegment = function(segment){
			//console.log('getSegment =' + typeof segment);
			PostCode.query(segment, function(data, status, headers, config) {
				if(segment > 1){
					$scope.previousSegment = segment - 1;
				}
				
				$scope.postcodeSegment = data;
				$scope.currentSegment = segment;
				
				$scope.postCodesInPage = PostCode.getPage(segment, $scope.postcodeSegment, $scope.setting.recordsPerPage);
				$scope.pageList = PostCode.getPageList($scope.postcodeSegment.length, 
						segment, $scope.setting.recordsPerPage, $scope.setting.pagesPerSegment);
				
				$scope.hasNext = PostCode.hasNextSegment($scope.total, $scope.postcodeSegment.length,
						segment, $scope.setting.recordsPerPage, $scope.setting.pagesPerSegment);
				
				// reset current page to first page
				$scope.postCodesInPage = PostCode.getPage(1, $scope.postcodeSegment, $scope.setting.recordsPerPage);
				$scope.currentPage = 1 + ($scope.currentSegment - 1)*$scope.setting.pagesPerSegment;
			});
		};
	});
//	.controller('UserListCtrl', function($scope, User) {
//		$scope.users = User.query();
//		
//		$scope.editUser = function(user){
//			if(user === 'new'){
//				$scope.isNew = true;
//				$scope.user = {firstname:'', lastname:'', email:'', age:''};
//			}else{
//				$scope.isNew = false;
//				$scope.user = user;
//			}
//		};
//	})
//	.controller('UserDetailCtrl', function($scope, User) {
//		
//	});
//	.controller('ContactController', function ($scope, ContactService) {
//		$scope.contacts = ContactService.list();
//		
//		$scope.saveContact = function () {
//			ContactService.save($scope.newcontact);
//			$scope.newcontact = {};
//		};
//		
//		$scope.delete = function (id) {
//			ContactService.delete(id);
//			if ($scope.newcontact.id == id) $scope.newcontact = {};
//		};
//		
//		$scope.edit = function (id) {
//			console.log('edit i=' + typeof(id));
//			$scope.newcontact = angular.copy(ContactService.get(id));
//		}
//	});