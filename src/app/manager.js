import { StationNode } from './station.js'
import { STATIONS } from './static/stations_all.js'
import { TARGET_STATIONS } from './static/stations_target_ids.js'
import { extractSupportedStations } from './utils/extract_supported_stations.js'

export class StationManager {
    constructor() {
        this.stations = [];
        this.stationsFiltered = extractSupportedStations(STATIONS, TARGET_STATIONS);
    }

    initStations() {
        for (const [parent_station_id, station_data] of Object.entries(this.stationsFiltered)) {
            let station = new StationNode(parent_station_id, station_data);
            station.initPopup();
            station.initMarker();
            this.stations.push(station);
        }
    }

    async loadStationTimes(batchSize = 6) {
        for (let i = 0; i < this.stations.length; i += batchSize) {
            const batch = this.stations.slice(i, i + batchSize);
            await Promise.all(
                batch.map(async (station) => {
                    await station.updateWaitTimes();
                    station.updatePopup();
                })
            );
        }
    }
}