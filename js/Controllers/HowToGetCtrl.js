bgmApp.controller('HowToGetCtrl', function() {
	setTimeout(function(){
		map.init(51.090474, 17.065839, '#how-to-get-map');
		map.addMarker([51.090474, 17.065839], {
			img: '/dist/img/gastro7.jpg',
			text: 'Zaklęte Rewiry',
			link: 'http://zakleterewiry.pl/',
			linkText: 'Zobacz szczegóły >'
		});
	}, 1);
});  