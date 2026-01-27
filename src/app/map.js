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