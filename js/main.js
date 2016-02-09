var app = new App();

function App() {
	'use strict';

	var _self = this;

	var desktop, netbook, tablet, phone;

	this.init = function(url) {
		_self.markMenuItem(url);
		_self.detectDevice();

		if(desktop) {
			var h = $(document).height();
			$('aside, #container').css('min-height', h); 
		}
	}

	this.markMenuItem = function(url) {
		$('.main-nav a').removeClass('current');
		$('.main-nav a[href="' + url + '"]').addClass('current');
	}

	this.detectDevice = function() {
		var w = $(window).width();

        desktop = (w > 1199);
        netbook = (w > 991 && w < 1200);
        tablet = (w > 767 && w < 992);
        phone = (w < 768);
	}

}

$(document).ready(function(){
	$(window).resize(function(){
		app.init();
	});
});
