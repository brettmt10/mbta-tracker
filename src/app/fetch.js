import { station_nodes } from './map.js';
import { STATIONS } from './static/stcStations.js'

async function getStationData(station_id) {
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