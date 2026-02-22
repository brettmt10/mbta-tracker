export class StationNode {
    constructor(parent_station_id, station_data) {
        this.parent_station_id = parent_station_id;
        this.coords = station_data.coords;
        this.stops = station_data.stops;
        this.name = station_data.name;
        this.wait_times = null;
        this.marker = L.marker();
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
        const data = await this.getStationTimes();
        this.wait_times = data.res;
    }

    initPopup() {
        this.popup.setLatLng(L.latLng(this.coords[0], this.coords[1]));

        const lines = [...new Set(this.stops.map(stop => stop.line))];

        const line_colors = {
            "Red Line": "#CC0000",
            "Orange Line": "#ed8b00",
            "Blue Line": "#003da5",
            "Green Line": "#00843d"
        };

        const buttons = lines.map(line => `
            <button style="background-color: ${line_colors[line]}; width: 20px; height: 20px; border-radius: 50%; border: none;"></button>
        `).join('');

        const content = `
            <div>
                <h3>${this.name}</h3>
                <div>
                    ${buttons}
                </div>
            </div>`;

        this.popup.setContent(content);
    }

    initMarker() {
        this.marker.setLatLng(this.coords);
        this.marker.bindPopup(this.popup);
    }

    updatePopup() {
        // sets the wait times in the popup by getting top 3 times per direction in station
        const directions = [...new Set(this.stops.map(stop => stop.direction))];
        console.log(directions);

    
        const grouped = {};
        for (const direction of directions) {
            grouped[direction] = this.wait_times.filter(time => time.direction === direction).slice(0, 3);
        }    
    }
}