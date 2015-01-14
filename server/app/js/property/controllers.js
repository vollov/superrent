angular.module('rental.property.controllers',['rental.configuration'])
.controller('PropertyCtrl',['$scope', '$http', 'settings', function($scope, $http, settings) {
	
	var propertyUrl = 'http://'+ settings.api_host + ':' + settings.api_port 
		+'/api/property';
	
	$scope.data = {};
	
	$http.get(propertyUrl).success(function(data) {
		$scope.data.properties = data;
	}).error(function(error) {
		$scope.data.error = error;
	});
	
}])
.controller("PropertyListCtrl", ['$scope', '$routeParams','$location','types', function ($scope, $routeParams,$location, types) {

	$scope.getStatusClass = function (item) {
		//console.log(Buffer.isBuffer(item.status));
		return item.status?  'label-success' : 'label-danger';
	};
	
	$scope.getStatusText = function (item) {
		//console.log(Buffer.isBuffer(item.status));
		return item.status?  'Avaliable' : 'Rented';
	};
	
	$scope.getTypeText = function (item) {
		//console.log("types-> %j", types.property_type);
		return types.property_type[item.type];
	};
	
	//var selectedType = $routeParams.type;
//	var selectedType = null;
//	
//	$scope.selectType = function (type) {
//		selectedType = type;
//		console.log('type->' + type);
//	};
//	
//	$scope.filterPropertyByType = function (property) {
//		return selectedType == null ||
//		property.type == selectedType;
//	}
	
	var selectedCity = $routeParams.city;
	//var selectedCity = null;
	
	$scope.selectCity = function (city) {
		selectedCity = city;
		//$location.path('/listing/'+ city);
	};
	
	$scope.filterPropertyByCity = function (property) {
		return selectedCity == null ||
		property.city == selectedCity;
	}
}]);