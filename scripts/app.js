function initMap() {
    const wimbledonLocations = {lat: 51.4340, lng: -0.2143};

    const map = new google.maps.Map(document.getElementById("ss_map"), {
        zoom: 16,
        center: wimbledonLocations,
        mapId: 'WIMBLEDON_STYLED_MAP'
    })


}


const mapsScript = document.createElement('script');
mapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${window.API_KEYS.googleMaps}&callback=initMap`;
mapsScript.async = true;
mapsScript.defer = true;
document.head.appendChild(mapsScript);
