import { STATIONS_RED } from './constants/stations.js';

const parentStationsRed = Object.keys(STATIONS_RED);

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

for (let i = 0; i < parentStationsRed.length - 1; i++) {
    const station = STATIONS_RED[parentStationsRed[i]];
    const nextStation = STATIONS_RED[parentStationsRed[i + 1]];
    
    const stationCoords =  L.latLng(station.coords.latitude, station.coords.longitude);
    const nextStationCoords =  L.latLng(nextStation.coords.latitude, nextStation.coords.longitude);

    L.polyline([stationCoords, nextStationCoords], {
        color: '#DA291C',
        weight: 10,
        opacity: 0.8,
        lineJoin: 'round',
        lineCap: 'round'
    }).addTo(map); 
}

export const station_nodes = {}

for (let i = 0; i < parentStationsRed.length; i++) {
    const station = STATIONS_RED[parentStationsRed[i]];
    
    const stationCoords =  L.latLng(station.coords.latitude, station.coords.longitude);

    var marker = L.circleMarker(stationCoords, {
        radius: 8,
        fillColor: '#0e0d0d',
        color: '#FFFFFF',
        weight: 3,
        opacity: 1,
        fillOpacity: 1
    }).addTo(map);

    
    station_nodes[parentStationsRed[i]] = {
        "marker": marker,
        "data": null
    };
    
}