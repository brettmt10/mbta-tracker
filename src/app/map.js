import { StationManager } from './manager.js';

export class MapInstance {
    constructor() {
        this.manager = new StationManager();
        this.map = L.map('map').setView([42.356428, -71.078908], 14.5);
    }

    init() {
        this.initMap();
        this.manager.initStations();
        this.placeMarkers();
    }

    initMap() {
        var corner1 = L.latLng(42.325532, -71.158761),
        corner2 = L.latLng(42.400203, -71.010778),
        bounds = L.latLngBounds(corner1, corner2);
        this.map.setMaxBounds(bounds);
        this.map.options.maxBoundsViscosity = 1.0;
        this.map.setMinZoom(14);
        this.map.setMaxZoom(19);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap, © CartoDB'
        }).addTo(this.map);
    }

    placeMarkers() {
        for (const station of this.manager.stations) {
            station.marker.addTo(this.map);
        }
    }

}

const map = new MapInstance();
await map.init();
console.log(map.manager.stations);