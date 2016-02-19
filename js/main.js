var app = new App();
var map = new Map();

var dupa = 0;

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
		else{
			app.showMenu(); 
		}
	}

	this.initScroll = function() {
		$('aside').enscroll({
			showOnHover: false,
		    verticalTrackClass: 'scroll-track',
		    verticalHandleClass: 'scroll-handle'
		});

		$('.enscroll-track').parent().css({'z-index':'99999', 'position':'fixed'});

		$('aside, .scroll-track').hover(
			function(){
				$('.scroll-track').stop().animate({'opacity': 1}, 300);
			},
			function(){
				$('.scroll-track').stop().animate({'opacity': 0}, 300);
			}
		);
	}

	this.matchWindowHeight = function() {
		if(desktop) {
			var h = $(window).height();
			$('aside, #container, .tile').css('min-height', h); 
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

function CustomMarker(latlng, map, args) {
	this.latlng = latlng;	
	this.args = args;	
	this.setMap(map);	
}

function Map() {
	var _self = this;
	var zoom;
	var map;
	var geocoder;
	var latlngbounds;
	var styles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];

	this.init = function(lat, lng, selector) {

		CustomMarker.prototype = new google.maps.OverlayView();

		CustomMarker.prototype.draw = function() {
			
			var self = this;
			
			var div = this.div;
			
			if (!div) {
			
				div = this.div = document.createElement('div');
				
				div.className = 'marker';

				if (typeof(self.args) !== 'undefined') {
					jQuery(div).append('<div class="bubble"></div>');
				}
				
				if (typeof(self.args.img) !== 'undefined') {
					jQuery(div).find('.bubble').append('<img src="' + self.args.img + '" style="max-width:100%;">');
				}

				if (typeof(self.args.text) !== 'undefined') {
					jQuery(div).find('.bubble').append('<p>' + self.args.text + '</p>');
				}

				if (typeof(self.args.link) !== 'undefined' && typeof(self.args.linkText) !== 'undefined') {
					jQuery(div).find('.bubble').append('<a target="_blank" href="' + self.args.link + '">' + self.args.linkText + '</a>');
				}
				
				google.maps.event.addDomListener(div, "click", function(event) {
					jQuery('.bubble').hide();			
					jQuery(this).find('.bubble').fadeIn('fast');

					google.maps.event.trigger(self, "click");
				});
				
				var panes = this.getPanes();
				panes.overlayImage.appendChild(div);
			}
			
			var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
			
			if (point) {
				div.style.left = (point.x - 10) + 'px';
				div.style.top = (point.y - 20) + 'px';
			}
		};

		CustomMarker.prototype.remove = function() {
			if (this.div) {
				this.div.parentNode.removeChild(this.div);
				this.div = null;
			}	
		};

		CustomMarker.prototype.getPosition = function() {
			return this.latlng;	
		};

		var myLatlng = new google.maps.LatLng(lat, lng);
		var mapOptions = {
			zoom: 14,
			center: myLatlng,
			disableDefaultUI: true,
			styles: styles
		}
		
		_self.map = new google.maps.Map(jQuery(selector)[0], mapOptions);
		_self.geocoder = new google.maps.Geocoder();
		_self.latlngbounds = new google.maps.LatLngBounds();
	}

	this.addMarker = function(pos, args) {
		args = args || {};

		if ( typeof pos == 'string' ) {
			_self.geocoder.geocode({'address': pos}, function(results, status) {
				if ( status === google.maps.GeocoderStatus.OK ) {
					new CustomMarker(results[0].geometry.location, _self.map, args);
					_self.latlngbounds.extend(results[0].geometry.location);
					_self.map.setCenter(results[0].geometry.location);

					//_self.fitBounds();
				}
			});

		} else {
			var pos = new google.maps.LatLng(pos[0], pos[1])
			new CustomMarker(pos, _self.map, args);
			_self.latlngbounds.extend(pos);

			//_self.fitBounds();
		}

	}

	this.fitBounds = function() {
		_self.map.fitBounds(_self.latlngbounds);

		if ( _self.map.getZoom() > 16 ) {
			_self.map.setZoom(16);
		};
	}

	this.getMap = function() {
		return _self.map;
	}

	this.setZoom = function(zoom) {
		_self.zoom = zoom;
		_self.map.setZoom(zoom);
	}
}

$(document).ready(function(){
	app.initScroll();
	app.responsiveMenuHandler();

	$(window).resize(function(){
		app.init();
	});

	$(window).load(function(){
		app.detectDevice();
		app.matchWindowHeight();
	});
});
