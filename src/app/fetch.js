import { station_nodes } from './map.js'; // or whatever your map file is named
import { STATIONS_RED } from './constants/stations.js';

async function getData(station_id) {
    const url =`http://localhost:8000/times/${station_id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function fetchAllStations() {
    const parentStationsRed = Object.keys(STATIONS_RED);
    for (let i = 0; i < parentStationsRed.length; i++) {
        let station = parentStationsRed[i];
        let data = await getData(station);
        station_nodes[station].data = data;
        console.log(station_nodes[station]);
    }
}

fetchAllStations();