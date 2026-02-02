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

setInterval(() => getData('place-harsq'), 30000);