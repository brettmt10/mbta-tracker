export function filterByLine(line, stations) {
  return Object.entries(stations)
    .filter(([, station]) => station.stops.some(stop => stop.line === line))
    .reduce((obj, [id, station]) => {
      obj[id] = station;
      return obj;
    }, {});
}