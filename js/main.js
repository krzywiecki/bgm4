var app = new App();

function App() {
	'use strict';

	var _self = this;

	var desktop, netbook, tablet, phone;

	this.init = function(url) {
		_self.markMenuItem(url);
		_self.detectDevice();
		_self.matchWindowHeight();
		if(!desktop) {
			app.hideMenu();
		}
	}

	this.matchWindowHeight = function() {
		if(desktop) {
			var h = $(window).height();
			$('aside, #container').css('min-height', h); 
		}
	}

	this.markMenuItem = function(url) {
		$('.main-nav a').removeClass('current');
		$('.main-nav a[href="' + url + '"]').addClass('current');
	}

	this.detectDevice = function() {
		var w = $(window).width();

        desktop = (w > 980);
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

	this.responsiveMenuHandler = function() {
		$('.btn-menu').click(function(){
			if($('aside').hasClass('active')) {
				_self.hideMenu();
			}
			else {
				_self.showMenu();
			}
		});
	}

	this.showMenu = function() {
		$('aside').stop().animate({ left: 0 }, 300);	
		$('aside').addClass('active');
	}

	this.hideMenu = function() {
		$('aside').stop().animate({ left: -243 }, 300);
		$('aside').removeClass('active');
	}
}

$(document).ready(function(){
	
	app.responsiveMenuHandler();

	$(window).resize(function(){
		app.init();
	});
});
