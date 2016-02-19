var bgmApp = angular.module('bgmApp', ['ngRoute']);

bgmApp.config(function($routeProvider, $locationProvider) {
	
	$routeProvider
		.when('/:lang', {
			templateUrl: function(urlAttr) {
				return 'templates/pl/home.html';
			}
		})
		.when('/:lang/:file', {
			templateUrl: function(urlAttr) {
				return 'templates/pl/' + urlAttr.file + '.html';
			}
		})
		.when('/:lang/:path/:file', {
			templateUrl: function(urlAttr) {
				return 'templates/pl/' + urlAttr.path + '/' + urlAttr.file + '.html';
			}
		})
		.otherwise({
			redirectTo: '/pl'
		});

		$locationProvider.html5Mode(true);

});    

bgmApp.run(function($rootScope, $location) {
    $rootScope.$on( "$routeChangeSuccess", function(event, next, current) {
    	var url = $location.url();
    	$rootScope.bodyClass = url.split('/')[2] ? url.split('/')[2] : 'home';
    	app.init(url);
	});
});