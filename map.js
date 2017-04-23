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
    center: {lat: -34.397, lng: 150.644},
    zoom: 3,
    disableDefaultUI: true,
    minZoom: 2
  });

  var iconBase = 'img/';
  var icons = {
    angry: {
      url: iconBase + '1.png',
      scaledSize : new google.maps.Size(30,30)
    },
    disgusted: {
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

  fetch('/sample.json')
    .then(function(response) {
      return response.json();
    }).then(function(result) {
      console.log('results',result);
      locations = result;

      // Google Array of LatLng Object
      var features = locations.map(function(location) {
        return {
          position: new google.maps.LatLng(location.lat, location.lng),
          type: location.type
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
          case 'disgusted':
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
}