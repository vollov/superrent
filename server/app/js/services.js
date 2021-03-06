'use strict';

/**
 * Service to store global settings.
 * Factory will create single instance, Service will always create a new one
 */
angular.module('rental.configuration', [ ])
.factory('settings', function() {
	return {
		api_host: 'superrent.ca',
		api_port: '80',
		page_size: 15
	}
}).factory('types', function() {
	return {
		property_type: {1:'family',2:'student',3:'professional'}
	}
});
