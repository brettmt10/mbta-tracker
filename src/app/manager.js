import { STATIONS } from './static/stcStations.js'
import { StationNode } from './station.js'

export class StationManager {
    constructor() {
        this.stations = [];
    }

    initalizeStations() {
        for (const [parent_station_id, station_data] of Object.entries(STATIONS)) {
            let station = new StationNode(parent_station_id, station_data);
            this.stations.push(station);
        }
    }
    
    async loadStationTimes() {
        for (const station of this.stations) {
            station.wait_times = await station.getStationTimes();
        }
    }
}