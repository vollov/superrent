angular.module('rental.property.controllers',['rental.configuration'])
.controller('PropertyCtrl', function($scope, $http, settings) {
	
	var propertyUrl = 'http://'+ settings.api_host + ':' + settings.api_port 
		+'/api/property';
	
	$scope.data = {};
	
	$http.get(propertyUrl).success(function(data) {
		$scope.data.properties = data;
	}).error(function(error) {
		$scope.data.error = error;
	});
	
})
.controller("PropertyListCtrl", function ($scope, $routeParams,$location, types, settings) {
	$scope.orderProp = 'start_price';
	$scope.selectedPage = 1;
	$scope.pageSize = settings.page_size;
	
	$scope.sortProperties = function (field){
		$scope.orderProp = field;
	};
	
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
	var selectedType = null;
	
	$scope.getTypeText = function (index) {
		return types.property_type[index];
	}
	
	$scope.selectType = function (type) {
		selectedType = type;
		$scope.currentType = "(" + $scope.getTypeText(type) +')';
		$scope.selectedPage = 1;
		//console.log('type->' + type);
	};
	
	$scope.filterPropertyByType = function (property) {
		return selectedType == null ||
		property.type == selectedType;
	}
	
	var selectedCity = $routeParams.city;
	//var selectedCity = null;
	
	$scope.selectCity = function (city) {
		selectedCity = city;
		$scope.currentCity = "- " + city;
		$scope.selectedPage = 1;
		//$location.path('/listing/'+ city);
	};
	
	$scope.selectPage = function (newPage) {
		$scope.selectedPage = newPage;
	};
	
	$scope.getPageClass = function (page) {
		return $scope.selectedPage == page ? "btn-primary" : "";
	};
	
	$scope.filterPropertyByCity = function (property) {
		return selectedCity == null ||
		property.city == selectedCity;
	}
})
.controller('PropertyDetailCtrl',function($scope, $routeParams) {
    $scope.id = $routeParams.id;
});