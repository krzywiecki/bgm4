var bgmApp = angular.module('bgmApp', ['ngRoute']);

bgmApp.config(function($routeProvider, $locationProvider) {
	
	$routeProvider
		.when('/pl', {
			templateUrl: 'templates/pl/home.html',
			controller: 'HomeCtrl'
		})
		.when('/pl/final', {
			templateUrl: 'templates/pl/final.html',
			controller: 'FinalCtrl'
		})
		.otherwise({
			redirectTo: '/pl'
		});

		$locationProvider.html5Mode(true);

});    

bgmApp.run(function($rootScope, $location) {
   $rootScope.$watch(function() { 
      return $location.path(); 
    },
    function(url){
    	$rootScope.$on( "$routeChangeSuccess", function(event, next, current) {
    		app.init(url);	
		});
    });
});