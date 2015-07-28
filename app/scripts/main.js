console.log('\'Allo \'Allo!');

jQuery(document).ready(function () {
    var map;

    var style = [
    	{
		    fillColor: 'green',
		    strokeWeight: 1
		  },

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
			{ visibility: "off" }
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
        minZoom: 3,
        center:  new google.maps.LatLng(54.597280, -5.930169),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    map = new google.maps.Map($('#map')[0], options);
    map.setOptions({
        styles: style
    });

    google.maps.event.addListener(map, 'zoom_changed', function() {
     if (map.getZoom() > maxZoomLevel) map.setZoom(maxZoomLevel);
   });
    google.maps.event.addListener(map, 'zoom_changed', function() {
    if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
   });
    google.maps.event.addListener(map, 'center_changed', function() {
    checkBounds(map);
	});
	// If the map position is out of range, move it back
	function checkBounds(map) {

	var latNorth = map.getBounds().getNorthEast().lat();
	var latSouth = map.getBounds().getSouthWest().lat();
	var newLat;


	if(latNorth<85 && latSouth>-85)     /* in both side -> it's ok */
	    return;
	else {
	    if(latNorth>85 && latSouth<-85)   /* out both side -> it's ok */
	        return;
	    else {
	        if(latNorth>85)   
	            newLat =  map.getCenter().lat() - (latNorth-85);   /* too north, centering */
	        if(latSouth<-85) 
	            newLat =  map.getCenter().lat() - (latSouth+85);   /* too south, centering */
	    }   
	}
	if(newLat) {
	    var newCenter= new google.maps.LatLng( newLat ,map.getCenter().lng() );
	    map.setCenter(newCenter);
	    }
	}

    map.data.loadGeoJson('/scripts/json/countries-hires.json');

      map.data.setStyle(function(feature) {
	    var color = 'red';
	    if (feature.getProperty('isColorful')) {
	      color = feature.getProperty('color');
	    }
	    return /** @type {google.maps.Data.StyleOptions} */({
	      fillColor: color,
	      strokeColor: color,
	      strokeWeight: 2
	    });
	  });

	  map.data.addListener('click', function(event) {
	    event.feature.setProperty('isColorful', true);

	  });

	  map.data.addListener('mouseover', function(event) {
	    map.data.revertStyle();
	    map.data.overrideStyle(event.feature, {strokeWeight: 8});
	  });

	  map.data.addListener('mouseout', function(event) {
	    map.data.revertStyle();
	  });

});