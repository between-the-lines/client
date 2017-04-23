var map;

function MoodGen() {
  this.anger = 0;
  this.disgust = 0;
  this.fear = 0;
  this.joy = 0;
  this.sadness = 0;
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 9,
    minZoom: 2
  });
  
  // TEST DATA
  var locations = [
    {lat: -31.563910, lng: 147.154312, type: { mood: 'angry', percentage: 0.43}},
    {lat: -33.718234, lng: 150.363181, type: { mood: 'joy', percentage: 0.15}},
    {lat: -33.727111, lng: 150.371124, type: { mood: 'disgusted', percentage: 0.53}},
    {lat: -33.848588, lng: 151.209834, type: { mood: 'fear', percentage: 0.78}},
    {lat: -33.851702, lng: 151.216968, type: { mood: 'sadness', percentage: 0.42}},
    {lat: -34.671264, lng: 150.863657, type: { mood: 'angry', percentage: 0.34}},
    {lat: -35.304724, lng: 148.662905, type: { mood: 'fear', percentage: 0.64}},
    {lat: -36.817685, lng: 175.699196, type: { mood: 'angry', percentage: 0.64}},
    {lat: -36.828611, lng: 175.790222, type: { mood: 'joy', percentage: 0.32}},
    {lat: -37.750000, lng: 145.116667, type: { mood: 'fear', percentage: 0.73}},
    {lat: -37.759859, lng: 145.128708, type: { mood: 'disgusted', percentage: 0.45}},
    {lat: -37.765015, lng: 145.133858, type: { mood: 'angry', percentage: 0.41}},
    {lat: -37.770104, lng: 145.143299, type: { mood: 'joy', percentage: 0.51}},
    {lat: -37.773700, lng: 145.145187, type: { mood: 'angry', percentage: 0.83}},
    {lat: -37.774785, lng: 145.137978, type: { mood: 'disgusted', percentage: 0.42}},
    {lat: -37.819616, lng: 144.968119, type: { mood: 'joy', percentage: 0.23}},
    {lat: -39.927193, lng: 175.053218, type: { mood: 'fear', percentage: 0.23}},
    {lat: -38.330766, lng: 144.695692, type: { mood: 'disgusted', percentage: 0.23}},
    {lat: -41.330162, lng: 174.865694, type: { mood: 'joy', percentage: 0.23}},
    {lat: -42.734358, lng: 147.439506, type: { mood: 'angry', percentage: 0.23}},
    {lat: -42.734358, lng: 147.501315, type: { mood: 'fear', percentage: 0.23}},
    {lat: -42.735258, lng: 147.438000, type: { mood: 'disgusted', percentage: 0.23}},
    {lat: -43.999792, lng: 170.463352, type: { mood: 'joy', percentage: 0.23}}
  ];

  var features = locations.map(function(location) {
    return {
      position: new google.maps.LatLng(location.lat, location.lng),
      type: location.type
    }
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
  var markers = features.map(function(feature, i) {
    return new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type.mood],
      percentage: feature.type.percentage,
      mood: feature.type.mood
    });
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

    console.log(moods);
    var largest = Object.keys(moods).reduce(function(a, b){ return moods[a] > moods[b] ? a : b });
    console.log(largest);

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

    console.log('index', index);
    return {
        text: "",
        index: index
    };
  });
}