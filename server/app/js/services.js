'use strict';

/**
 * Service to store global settings.
 * Factory will create single instance, Service will always create a new one
 */
angular.module('rental.configuration', [ ])
.factory('settings', function() {
	return {
		api_host: '192.168.11.22',
		api_port: '8800'
	}
});
