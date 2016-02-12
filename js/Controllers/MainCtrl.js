bgmApp.controller('MainCtrl', function($scope, $window) {
	var lang = $window.navigator.language || $window.navigator.userLanguage; 
	var lang = lang.split('-')[0];
	$scope.lang = lang;
});