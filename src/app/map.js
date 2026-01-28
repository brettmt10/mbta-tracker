import { red_line_stations } from './constants.js';

var corner1 = L.latLng(42.325532, -71.158761),
corner2 = L.latLng(42.400203, -71.010778),
bounds = L.latLngBounds(corner1, corner2);

const map = L.map('map').setView([42.356428, -71.078908], 14.5);
map.setMaxBounds(bounds);
map.options.maxBoundsViscosity = 1.0;
map.setMinZoom(14);
map.setMaxZoom(19);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap, © CartoDB'
}).addTo(map);


for (let i = 0; i < red_line_stations.length - 1; i++) {
    var station = red_line_stations[i];
    L.polyline([station.coords, red_line_stations[i + 1].coords], {
        color: '#DA291C',
        weight: 10,
        opacity: 0.8,
        lineJoin: 'round',
        lineCap: 'round'
    }).addTo(map);
}

for (let i = 0; i < red_line_stations.length; i++){
    var station = red_line_stations[i];
    L.circleMarker(station.coords, {
        radius: 8,
        fillColor: '#0e0d0d',
        color: '#FFFFFF',
        weight: 3,
        opacity: 1,
        fillOpacity: 1
    }).addTo(map).bindPopup(station.name);
}