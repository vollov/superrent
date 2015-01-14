'use strict';

/**
 * Service to store global settings.
 * Factory will create single instance, Service will always create a new one
 */
angular.module('rental.configuration', [ ])
.factory('settings', function() {
	return {
		api_host: 'localhost',
		api_port: '8800'
	}
});
