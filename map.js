var map, locations;

// State Constructor
function MoodGen() {
  this.anger = 0;
  this.disgust = 0;
  this.fear = 0;
  this.joy = 0;
  this.sadness = 0;
}

// Google Map API
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:37.642391, lng: -120.996895},
    zoom: 9,
    disableDefaultUI: true,
    minZoom: 2
  });

  var iconBase = 'img/';
  var icons = {
    anger: {
      url: iconBase + '1.png',
      scaledSize : new google.maps.Size(30,30)
    },
    disgust: {
      url: iconBase + '2.png',
      scaledSize : new google.maps.Size(30,30)
    },
    fear: {
      url: iconBase + '3.png',
      scaledSize : new google.maps.Size(30,30)
    },
    joy: {
      url: iconBase + '4.png',
      scaledSize : new google.maps.Size(30,30)
    },
    sadness: {
      url: iconBase + '5.png',
      scaledSize : new google.maps.Size(30,30)
    }
  };

  fetch('/users_3.json')
    .then(function(response) {
      return response.json();
    }).then(function(result) {
      console.log('results',result);
      locations = result;

      // Google Array of LatLng Object
      var features = locations.map(function(location) {
        var contentString = location.type.mood + ": " + location.type.percentage;
        return {
          position: new google.maps.LatLng(location.lat, location.lng),
          type: location.type,
          info: new google.maps.InfoWindow({ content: contentString })
        };
      });
      // Marker Creator
      var markers = features.map(function(feature, i) {
        var mark = new google.maps.Marker({
          position: feature.position,
          icon: icons[feature.type.mood],
          animation: google.maps.Animation.DROP,
          percentage: feature.type.percentage,
          mood: feature.type.mood
        });
        mark.addListener('mouseover', function() {
          feature.info.open(map, mark);
        });
        return mark;
      });

      var imagePath = 'img/'
      mcOptions = { styles: [{
        height: 72,
        url: imagePath + "1.png",
        width: 72
        },
        {
        height: 72,
        url: imagePath + "2.png",
        width: 72
        },
        {
        height: 72,
        url: imagePath + "3.png",
        width: 72
        },
        {
        height: 72,
        url: imagePath + "4.png",
        width: 72
        },
        {
        height: 72,
        url: imagePath + "5.png",
        width: 72
      }]};

      var markerCluster = new MarkerClusterer(map, markers, mcOptions);

      // google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster) {

      //       var content = '';
      //       // Convert the coordinates to an MVCObject
      //       var info = new google.maps.MVCObject;
      //       info.set('position', cluster.center_);
      //       //Get markers
      //       var marks_in_cluster = cluster.getMarkers();

      //       console.log(marks_in_cluster);

      //       for (var z = 0; z < marks_in_cluster.length; z++) {
      //           content = makeClusterInfo(marks_in_cluster,z);
      //       }

      //       infowindow.close(); // closes previous open ifowindows
      //       infowindow.setContent(content);
      //       infowindow.open(map, info);
      //       google.maps.event.addListener(map, 'zoom_changed', function() {
      //           infowindow.close()
      //       });

      //   });

      markerCluster.setCalculator(function(markers, numStyles) {
        var index = 0,
            count = markers.length,
            total = count,
            numMoods = 0,
            moods = new MoodGen();

        while (total !== 0) {
          total = parseInt(total / 5, 10);
          index++;
        }
        // console.log(markers);
        markers.forEach(function(marker) {
          if (!moods[marker.mood]) {
            moods[marker.mood] = marker.percentage;
          } else {
            moods[marker.mood] += marker.percentage;
          }
          numMoods++;
        });

        for ( var mood in moods) {
          moods[mood] = moods[mood] / numMoods;
        }

        // console.log(moods);
        var largest = Object.keys(moods).reduce(function(a, b){ return moods[a] > moods[b] ? a : b });
        // console.log(largest);

        switch(largest) {
          case 'angry':
            index = 1;
            break;
          case 'disgust':
            index = 2;
            break;
          case 'fear':
            index = 3;
            break;
          case 'joy':
            index = 4;
            break;
          case 'sadness':
            index = 5;
            break;
          default:
            index = 0;
        }

        // console.log('index', index);
        return {
            text: "",
            index: index
        };
      });
    }).catch(function(err) {
      console.log('There was an error', err);
    });

  // Bounce CB
  function toggleBounce() {
    if (this.getAnimation() !== null) {
      this.setAnimation(null);
    } else {
      this.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  var centre = map.getCenter();

  google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(centre);
  });


}
