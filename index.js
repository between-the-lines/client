var map;
function initMap() {
  // var uluru = {lat: -25.363, lng: 131.044};
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 9,
    minZoom: 2
  });
  // var marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map
  // });
  var locations = [
    {lat: -31.563910, lng: 147.154312, type: 'angry'},
    {lat: -33.718234, lng: 150.363181, type: 'joy'},
    {lat: -33.727111, lng: 150.371124, type: 'disgusted'},
    {lat: -33.848588, lng: 151.209834, type: 'fear'},
    {lat: -33.851702, lng: 151.216968, type: 'sadness'},
    {lat: -34.671264, lng: 150.863657, type: 'angry'},
    {lat: -35.304724, lng: 148.662905, type: 'fear'},
    {lat: -36.817685, lng: 175.699196, type: 'angry'},
    {lat: -36.828611, lng: 175.790222, type: 'joy'},
    {lat: -37.750000, lng: 145.116667, type: 'fear'},
    {lat: -37.759859, lng: 145.128708, type: 'disgusted'},
    {lat: -37.765015, lng: 145.133858, type: 'angry'},
    {lat: -37.770104, lng: 145.143299, type: 'joy'},
    {lat: -37.773700, lng: 145.145187, type: 'angry'},
    {lat: -37.774785, lng: 145.137978, type: 'disgusted'},
    {lat: -37.819616, lng: 144.968119, type: 'joy'},
    {lat: -39.927193, lng: 175.053218, type: 'fear'},
    {lat: -38.330766, lng: 144.695692, type: 'disgusted'},
    {lat: -41.330162, lng: 174.865694, type: 'joy'},
    {lat: -42.734358, lng: 147.439506, type: 'angry'},
    {lat: -42.734358, lng: 147.501315, type: 'fear'},
    {lat: -42.735258, lng: 147.438000, type: 'disgusted'},
    {lat: -43.999792, lng: 170.463352, type: 'joy'}
  ];

  var features = locations.map(function(location) {
    return {
      position: new google.maps.LatLng(location.lat, location.lng),
      type: location.type
    }
  });

  // var iconBase = 'https://cdn.shopify.com/s/files/1/1061/1924/products/';
  var iconBase = 'img/';
  
    var icons = {
      angry: {
        url: iconBase + 'Very_Angry_Emoji_7f7bb8df-d9dc-4cda-b79f-5453e764d4ea_large.png',
        scaledSize : new google.maps.Size(40,40)
      },
      disgusted: {
        url: iconBase + 'Cold_Sweat_Emoji_large.png',
        scaledSize : new google.maps.Size(40,40)
      },
      fear: {
        url: iconBase + 'OMG_Face_Emoji_large.png',
        scaledSize : new google.maps.Size(40,40)
      },
      joy: {
        url: iconBase + 'Smiling_Emoji_with_Smiling_Eyes_large.png',
        scaledSize : new google.maps.Size(40,40)
      },
      sadness: {
        url: iconBase + 'Sad_Face_Emoji_large.png',
        scaledSize : new google.maps.Size(40,40)
      }
    };
  var markers = features.map(function(feature, i) {
    return new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type]
    });
  });
  // mcOptions = {maxZoom: 9, styles: [{
  //   height: 53,
  //   url: "https://cdn.shopify.com/s/files/1/1061/1924/products/Very_Angry_Emoji_7f7bb8df-d9dc-4cda-b79f-5453e764d4ea_large.png",
  //   width: 53
  //   },
  //   {
  //   height: 56,
  //   url: "https://cdn.shopify.com/s/files/1/1061/1924/products/Cold_Sweat_Emoji_large.png",
  //   width: 56
  //   },
  //   {
  //   height: 66,
  //   url: "https://cdn.shopify.com/s/files/1/1061/1924/products/OMG_Face_Emoji_large.png",
  //   width: 66
  //   },
  //   {
  //   height: 78,
  //   url: "https://cdn.shopify.com/s/files/1/1061/1924/products/Smiling_Emoji_with_Smiling_Eyes_large.png",
  //   width: 78
  //   },
  //   {
  //   height: 90,
  //   url: "https://cdn.shopify.com/s/files/1/1061/1924/products/Sad_Face_Emoji_large.png",
  //   width: 90
  // }]}
  var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'img/'});
}