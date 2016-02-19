bgmApp.controller('PlacesTemplateCtrl', function() {

	var w = $(window).width();
	var h = $(window).height();

	$('#container').css({'width': w + 'px', 'height': h + 'px'});

	setTimeout(function(){
		map.init(51.1127633,17.0376033, '#places-map');
		map.addMarker([51.1127633,17.0376033], {
			text: 'Targowa - Craft Beer and Food',
			link: 'https://www.facebook.com/targowawroclaw/',
			linkText: 'Zobacz szczegóły >'
		});
		map.addMarker([51.110949,17.0218257], {
			text: 'Zakład Usług Piwnych',
			link: 'https://www.facebook.com/ZUP.Wroclaw/',
			linkText: 'Zobacz szczegóły >'
		});
		map.addMarker([51.1084729,17.0294714], {
			text: 'Kontynuacja',
			link: 'https://www.facebook.com/kontynuacja/',
			linkText: 'Zobacz szczegóły >'
		});
		map.addMarker([51.1093261,17.0229332], {
			text: 'Szynkarnia - local food & multitap',
			link: 'https://www.facebook.com/Szynkarnia/',
			linkText: 'Zobacz szczegóły >'
		});
		map.addMarker([51.1076401,17.027996], {
			text: 'Marynka Piwo i Aperitivo',
			link: 'https://www.facebook.com/marynkapiwoiaperitivo/',
			linkText: 'Zobacz szczegóły >'
		});
		map.addMarker([51.1077541,17.0340926], {
			text: '4Hops',
			link: 'https://www.facebook.com/4hops/',
			linkText: 'Zobacz szczegóły >'
		});
		map.addMarker([51.1270779,16.9918639], {
			text: 'Browar Stu Mostów',
			link: 'https://www.facebook.com/BrowarStuMostow/',
			linkText: 'Zobacz szczegóły >'
		});
		map.addMarker([51.1076401,17.027996], {
			text: 'Zaklęte Rewiry',
			link: 'https://www.facebook.com/ZakleteRewiry/',
			linkText: 'Zobacz szczegóły >'
		});
		map.fitBounds();
	},1);
}); 