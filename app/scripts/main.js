console.log('\'Allo \'Allo!');

jQuery(document).ready(function () {
    var map;

    var style = [
		{
		stylers: [
			{ saturation: "0" },
			{ lightness: "0" }
		]
		},{
		featureType: "poi",
		stylers: [
			{ visibility: "off" }
		]
		},{
		featureType: "transit",
		stylers: [
			{ visibility: "off" }
		]
		},{
		featureType: "road",
		stylers: [
			{ lightness: "50" },
			{ visibility: "on" }
		]
		},{
		featureType: "landscape",
		stylers: [
			{ lightness: "50" }
		]
		}
	]

    var options = {
        zoom: 9,
        center:  new google.maps.LatLng(54.597280, -5.930169),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };
    
    map = new google.maps.Map($('#map')[0], options);
    map.setOptions({
        styles: style
    });

});