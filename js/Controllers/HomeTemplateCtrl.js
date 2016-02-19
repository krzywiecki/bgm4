bgmApp.controller('HomeTemplateCtrl', function() {
	var i = 1;
	$('.tile').each(function(){
		var _self = $(this);
		setTimeout(function(){
			_self.addClass('animated flipInY');
		}, 200*i);
		i++;
	});

	app.matchWindowHeight();
});