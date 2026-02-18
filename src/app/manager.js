import { STATIONS_FILTERED } from './static/stcStationsSupported.js'
import { StationNode } from './station.js'

export class StationManager {
    constructor() {
        this.stations = [];
    }

    initStations() {
        for (const [parent_station_id, station_data] of Object.entries(STATIONS_FILTERED)) {
            let station = new StationNode(parent_station_id, station_data);
            station.initPopup();
            station.initMarker();
            this.stations.push(station);
        }
    }

    async loadStationTimes() {
        for (const station of this.stations) {
            console.log(`UPDATING TIMES:... ${station.name}`);
            await station.updateWaitTimes();
            console.log(`COMPLETED ITERATION:... ${station.name}`)
        }
    }
}

// function printStations(stationManager) {
//     stationManager.stations.forEach(station => console.log(station));
// }
// const manager = new StationManager();
// manager.initalizeStations();
// manager.stations.forEach(station => console.log(station));
// await manager.loadStationTimes();
// printStations(manager);