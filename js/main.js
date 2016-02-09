var app = new App();

function App() {
	'use strict';

	var _self = this;

	var desktop, netbook, tablet, phone;

	this.init = function(url) {
		_self.markMenuItem(url);
		_self.detectDevice();
		_self.matchWindowHeight();
	}

	this.matchWindowHeight = function() {
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

	this.matchHeight = function(element) {
		var highest = 0;
		$(element).each(function(){
			if($(this).outerHeight() > highest) {
				highest = $(this).outerHeight();
			}
		});
		$(element).css('height', highest);
	}

	this.setInVerticalCenter = function(element) {
		$(element).each(function() {
			var parentHeight = $(this).parent().height();
			var thisHeight = $(this).height();
			var marginTop = (parentHeight - thisHeight) / 2;
			$(this).css('margin-top', marginTop);
		});
	}
}

$(document).ready(function(){
	$(window).resize(function(){
		app.matchWindowHeight();
	});
});
