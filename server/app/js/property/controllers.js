angular.module('rental.property',['rental.configuration'])
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
.controller("PropertyListCtrl", ['$scope', function ($scope) {

	$scope.getStatusClass = function (item) {
		//console.log(Buffer.isBuffer(item.status));
		return item.status?  'label-success' : 'label-danger';
	};
	
	$scope.getStatusText = function (item) {
		//console.log(Buffer.isBuffer(item.status));
		return item.status?  'Avaliable' : 'Rented';
	};
	
}]);