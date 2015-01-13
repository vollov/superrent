angular.module('rental.property',['rental.configuration'])
.controller('PropertyCtrl',['$scope', '$http', 'settings', function($scope, $http, settings) {
	
	var propertyUrl = 'http://'+ settings.api_host + ':' + settings.api_port 
		+'/api/property';
	
	$scope.data = {};
	
	$http.get(propertyUrl).success(function(data) {
		$scope.data.products = data;
	}).error(function(error) {
		$scope.data.error = error;
	});
}]);