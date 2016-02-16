bgmApp.controller('PlacesTemplateCtrl', function() {
	var w = $(window).width();
	var h = $(window).height();

	$('#places-map').css({'width': w, 'height': h});
	$('#container').css('overflow', 'hidden');
});