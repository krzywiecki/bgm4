bgmApp.controller('BuyTicketTemplateCtrl', ['Gallery', function(Gallery) {
	Gallery.init('.single');

	var i = 1;
	$('.single').each(function(){
		var _self = $(this);
		setTimeout(function(){
			_self.addClass('fadeInLeft animated');
		}, 400*i);
		i++;
	});
}]);