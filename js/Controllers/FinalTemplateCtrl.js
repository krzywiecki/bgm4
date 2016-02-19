bgmApp.controller('FinalTemplateCtrl', function($scope) {
	$scope.$watch();
	
	app.matchHeight('.logotype');
	app.setInVerticalCenter('.logotype img');
	$('.col-left').addClass('animated fadeInLeft');
	setTimeout(function(){
		$('.col-right').addClass('animated fadeInLeft');
	}, 400);
});