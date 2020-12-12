var  map;

function showCurrentPosition() {

    // prueba la geolocalización html5
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, handleNoGeolocation, {timeout: 3000, enableHighAccuracy: true, maximumAge: 75000});
    }

}

function geolocationSuccess(p) {
    $('#Latitude').text("Latitude: " + p.coords.latitude);
    $('#Longitude').text("Longitude: " + p.coords.longitude);
    
    var pos = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);

    var mapOptions = {
        center: pos,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('geomap'),mapOptions);

    var marker = new google.maps.Marker({position: pos, title: "Tu posicion"});

    //para agregar el marcador al mapa, llame a setMap ()
    marker.setMap(map);

    map.setCenter(pos);
    
}

function handleNoGeolocation(erroflag) {
    if (erroflag) {
        var content = 'Error: El servicio de geoloclizacion fallo.';
    }else{
        var content = 'Error: Tu navegador no soporta la geolocalizacion.';
    }

    console.log("Error" + erroflag.message);

    var options = {
        map: map,
        position: new google.maps.LatLng(-0.166839, -78.481352),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}