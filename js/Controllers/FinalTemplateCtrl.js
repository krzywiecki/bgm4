bgmApp.controller('FinalTemplateCtrl', function($scope) {
	$scope.$watch();
	
	app.matchHeight('.logotype');
	app.setInVerticalCenter('.logotype img');
	$('.col-left').addClass('animated fadeInLeft');
	$('.col-right').addClass('animated fadeInRight');
});