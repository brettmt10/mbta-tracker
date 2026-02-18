import { STATIONS } from './stcStations.js'

const targetStations = [
  'place-davis',
  'place-portr',
  'place-harsq',
  'place-cntsq',
  'place-knncl',
  'place-chmnl',
  'place-pktrm',
  'place-dwnxg',
  'place-sstat'
];

export const STATIONS_FILTERED = Object.entries(STATIONS)
  .filter(([id]) => targetStations.includes(id))
  .reduce((obj, [id, station]) => {
    obj[id] = station;
    return obj;
  }, {});