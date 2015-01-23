angular.module('rental.property.services',['ngResource'])
.factory('Property', function($resource) {
	return $resource('/api/property/:id', {id: '@id'}, {
		update: {method:'PUT'}
	});
});