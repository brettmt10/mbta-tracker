import { fetchAllStations } from './fetch.js';

async function populateWindows() {
    console.log("updating windows...");
    let dataRed = await fetchAllStations('red');
    for (const [parent_station, props] of Object.entries(dataRed)) {
        let data = props.data;
        let marker = props.marker;

        const dir1 = data.filter(train => train.train_destination === 'Alewife')
        .slice(0, 3)
        .map(train => train.countdown);

        const dir2 = data.filter(train => train.train_destination === 'Ashmont/Braintree')
        .slice(0, 3)
        .map(train => train.countdown);

        const popupContent = `
            <b>${parent_station}</b><br>
            ${JSON.stringify(dir1, null, 2)}
        `;
        props.marker.bindPopup(popupContent);
    }
}

populateWindows();