var bgmApp = angular.module('bgmApp', ['ngRoute']);

bgmApp.config(function($routeProvider, $locationProvider) {
	
	$routeProvider
		.when('/:lang', {
			templateUrl: function(urlAttr) {
				return 'templates/' + urlAttr.lang + '/home.html';
			}
		})
		.when('/:lang/:file', {
			templateUrl: function(urlAttr) {
				return 'templates/' + urlAttr.lang + '/' + urlAttr.file + '.html';
			}
		})
		.when('/:lang/:path/:file', {
			templateUrl: function(urlAttr) {
				return 'templates/' + urlAttr.lang + '/' + urlAttr.path + '/' + urlAttr.file + '.html';
			}
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
    		$rootScope.bodyClass = url.split('/')[2];
    		app.init(url);
		});
    });
});