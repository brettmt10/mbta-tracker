import { fetchAllStations } from './fetch.js';

async function populateWindows() {
    console.log("updating windows...");
    let dataRed = await fetchAllStations('red');
    for (const [parent_station, props] of Object.entries(dataRed)) {
        const popupContent = `
            <b>${parent_station}</b><br>
            ${JSON.stringify(props.data, null, 2)}
        `;
        props.marker.bindPopup(popupContent);
    }
}

populateWindows();