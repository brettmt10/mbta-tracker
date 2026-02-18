export function extractSupportedStations(stations, targetStationIds) {
  return Object.entries(stations)
    .filter(([id]) => targetStationIds.includes(id))
    .reduce((obj, [id, station]) => {
      obj[id] = station;
      return obj;
    }, {});
}