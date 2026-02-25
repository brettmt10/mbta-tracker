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

        const content = `
            <div>
                <h3>${this.name}</h3>
            </div>`;

        this.popup.setContent(content);
    }

    initMarker() {
        const line_colors = {
            "Red Line": "#CC0000",
            "Orange Line": "#ed8b00",
            "Blue Line": "#003da5",
            "Green Line": "#00843d"
        };

        const firstLine = this.stops[0]?.line;
        const color = line_colors[firstLine] || "#333";

        const icon = L.divIcon({
            className: '',
            html: `<div style="
                width: 14px;
                height: 14px;
                background-color: ${color};
                border: 2px solid white;
                border-radius: 50%;
                box-shadow: 0 0 4px rgba(0,0,0,0.4);
            "></div>`,
            iconAnchor: [7, 7],
            popupAnchor: [0, -10]
        });

        this.marker.setLatLng(this.coords);
        this.marker.setIcon(icon);
        this.marker.bindPopup(this.popup);
    }

    updatePopup() {
        // sets the wait times in the popup by getting top 3 times per direction in station
        const directions = [...new Set(this.stops.map(stop => stop.direction))];
        console.log(directions);

        const lines = [...new Set(this.stops.map(stop => stop.line))];
        console.log(lines);

        const line_colors = {
            "Red Line": "#CC0000",
            "Orange Line": "#ed8b00",
            "Blue Line": "#003da5",
            "Green Line": "#00843d"
        };
    
        const grouped = {};
        for (const direction of directions) {
            grouped[direction] = this.wait_times.filter(time => time.direction === direction).slice(0, 3);
        }

        this.wait_times = grouped;
        
        let directionsHTML = '';
        for (const [direction, times] of Object.entries(grouped)) {
            const color = line_colors[times[0]?.line] || "#333";
            const timesHTML = times.map(t => `<div style="font-size:12px; color:#555;">${t.countdown}</div>`).join('');
            directionsHTML += `
                <div style="border-left: 4px solid ${color}; margin-bottom: 10px; padding-left: 8px;">
                    <div style="font-weight: bold; font-size: 13px; margin-bottom: 4px;">${direction}</div>
                    ${timesHTML}
                </div>`;
        }

        const content = `
            <div>
                <h3>${this.name}</h3>
                ${directionsHTML}
            </div>`;

        this.popup.setContent(content);
    }
}