export class StationNode {
    constructor(parent_station_id, station_data) {
        this.parent_station_id = parent_station_id;
        this.coords = station_data.coords;
        this.stops = station_data.stops;
        this.name = station_data.name;
        this.wait_times = null;
        this.popup = L.popup();
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

    async updateWaitTimes() {
        this.wait_times = await this.getStationTimes();
    }

    async generatePopup() {
        const content = `
        <div>
            <h3>${this.name}</h3>
        </div>`;

        this.popup.setLatLng(L.latLng(this.coords[0], this.coords[1]));
        this.popup.setContent(content);
    }
}