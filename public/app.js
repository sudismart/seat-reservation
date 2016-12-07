'use strict';

angular
	.module('myApp', [
		'myApp.seats',
		'ngStorage',
		'ui.router',
		'ui.bootstrap'
	])
	.config(['$urlRouterProvider', '$stateProvider','$locationProvider',
		function($urlRouterProvider,$stateProvider,$locationProvider) {
			$urlRouterProvider.otherwise('/');
			$locationProvider.html5Mode({
        		enabled: true,
        		requireBase: false
        	});
        }
    ])
	.filter('ellipsis', function() {
		return function(input, limit) {
			if(!limit) limit = 6;
			if(!input) return input;
			input = input.toString();
			if(input.length <= limit)
				return input;
			return input.slice(0, (limit - 3)) + '...';
		}
	})
;