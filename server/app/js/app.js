'use strict';

angular.module('rentalApp',['ngRoute','ngResource',
                          'rental.commonModule',
                          'rental.property.controllers',
                          'rental.property.filters']).config(function($routeProvider){
	$routeProvider.when('/listing', {
		templateUrl : '/views/property/list.html',
		controller : 'PropertyCtrl'
	}).when('/listing/:city',{
		templateUrl : '/views/property/list.html',
		controller : 'PropertyCtrl'
	}).when('/property/:id',{
		templateUrl : '/views/property/detail.html',
		controller : 'PropertyDetailCtrl'
	}).otherwise({
		redirectTo : '/listing'
	});
});
