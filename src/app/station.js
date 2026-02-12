export class StationNode {
    constructor(parent_station_id, station_data) {
        this.parent_station_id = parent_station_id;
        this.coords = station_data.coords;
        this.stops = station_data.stops;
        this.name = station_data.name;
        this.wait_times = null;
        this.next_station = null;
        this.prev_station = null;
    }

    async getStationTimes() {
        const url = `http://localhost:8000/times/${this.parent_station_id}`;
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
}