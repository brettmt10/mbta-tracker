import { StationManager } from './manager.js';
import { redCoords, orangeCoords, blueCoords, greenTrunkCoords, greenBCoords, greenCCoords, greenDCoords, greenECoords } from './static/polylines.js';

export class MapInstance {
    constructor() {
        this.manager = new StationManager();
        this.map = L.map('map').setView([42.356428, -71.078908], 14.5);
    }

    init() {
        this.initMap();
        this.manager.initStations();
        this.placeMarkers();
        this.placePolyLines();
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

    placePolyLines() {
        L.polyline(redCoords,        { color: '#CC0000' }).addTo(this.map);
        L.polyline(orangeCoords,     { color: '#ed8b00' }).addTo(this.map);
        L.polyline(blueCoords,       { color: '#003da5' }).addTo(this.map);
        L.polyline(greenTrunkCoords, { color: '#00843d' }).addTo(this.map);
        L.polyline(greenBCoords,     { color: '#00843d' }).addTo(this.map);
        L.polyline(greenCCoords,     { color: '#00843d' }).addTo(this.map);
        L.polyline(greenDCoords,     { color: '#00843d' }).addTo(this.map);
        L.polyline(greenECoords,     { color: '#00843d' }).addTo(this.map);
    }

    async main() {
        this.manager.loadStationTimes();
    }
    
}

const map = new MapInstance();
map.init();

setInterval(() => {
    map.main();
}, 60000);