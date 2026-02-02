async function getData(station_id) {
    const url =`http://localhost:8000/times/${station_id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

function startAutoRefresh(station_id, interval = 30000) {
    getData(station_id); // Run immediately
    setInterval(() => getData(station_id), interval); // Then repeat
}

startAutoRefresh('place-harsq');