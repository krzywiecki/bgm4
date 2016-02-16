bgmApp.controller('TileTemplateCtrl', function() {

	var i = 1;
	$('.tile-section').each(function(){
		var _self = $(this);
		if(i%2 == 0) {
			var animatation = 'fadeInLeft';
		}
		else {
			var animatation = 'fadeInLeft';
		}

		setTimeout(function(){
			_self.addClass('animated ' + animatation);
		}, 300*i);
		i++;
	});

});