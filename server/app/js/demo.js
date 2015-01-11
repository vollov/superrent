'use strict';

var api_url_root = 'http://localhost:3000';

angular.module('appModule', ['ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider.when('/demo', {
			controller : 'SimpleController',
			templateUrl : '/views/demo.html'
		}).otherwise({
			redirectTo : '/demo'
		});
	})
	.service('myService', function($http) {
		this.getOptions = function() {
			return $http.get(api_url_root +'/api/setting/1');
		};
	})
	.factory('init', function () {
		var initialized = false;
	
		var init = function() {
			// ...
		};
	
		init.watchAfterInit = function(scope, expression, listener, deepEqual) {
			scope.$watch(expression, function(newValue, oldValue, listenerScope) {
				if (initialized) {
					listener(newValue, oldValue, listenerScope);
				}
			}, deepEqual);
		};
	
		init.onAfterInit = function(scope, event, listener) {
			scope.$on(event, function(event) {
				if (initialized) {
					listener(event);
				}
			});
		};
	
		return init;
	})
	.controller('SimpleController', function($scope, myService, init) {
		$scope.selectedOption = null;
		$scope.options = [];
		
		init('SimpleController', [myService.getOptions()], function(result) {
			$scope.options = result.data;
			$scope.selectedOption = result.data.recordsPerPage;
		});
		
		init.watchAfterInit($scope, 'selectedOption', function(newValue, oldValue) {
			// handle selection change ...
			console.log("selection: " + $scope.selectedOption);
		});
		
		
//		myService.getOptions().then(function(result) {
//			$scope.options = result.data;
//			console.log("result.data=%j", result.data);
//			$scope.selectedOption = 0;
//		});
//		
//		$scope.$watch('selectedOption', function(newValue, oldValue) {
//			// handle selection change ...
//			console.log("selection: " + $scope.selectedOption);
//		});
});