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
        center:  new google.maps.LatLng(54.597280, -5.930169),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    map = new google.maps.Map($('#map')[0], options);
    map.setOptions({
        styles: style
    });

	var minZoomLevel = 3;
	var maxZoomLevel = 10;

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

	   var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

	  var infowindow = new google.maps.InfoWindow({
	      content: contentString
	  });

		map.data.addListener('click', function(event) {
	    document.getElementById('info-box').textContent = event.feature.getProperty('SOVEREIGNT');
	  });


});

(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
})(jQuery);

jQuery(function($) {
        $('.timer').countTo({
            from: 50,
            to: 2500,
            speed: 5000,
            refreshInterval: 50,
            onComplete: function(value) {
                console.debug(this);
            }
        });
    });

 