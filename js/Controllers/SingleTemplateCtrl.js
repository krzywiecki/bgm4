bgmApp.controller('SingleTemplateCtrl', ['Gallery', function(Gallery) {
	Gallery.init('.gallery');

	var i = 1;
	$('.single').each(function(){
		var _self = $(this);
		setTimeout(function(){
			_self.addClass('fadeInLeft animated');
		}, 400*i);
		i++;
	});
}]);