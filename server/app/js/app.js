'use strict';

angular.module('rentalApp',['ngRoute','ngResource',
                          'rental.commonModule',
                          'rental.property']).config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl : '/views/property/list.html'
	}).otherwise({
		redirectTo : '/login'
	});
});
