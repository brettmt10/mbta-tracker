import { STATIONS } from './stcStations.js'

const targetStations = [
  'place-sstat',
  'place-dwnxg',
  'place-pktrm',
  'place-chmnl',
  'place-knncl',
  'place-cntsq',
  'place-harsq',
  'place-portr',
  'place-davis',

  'place-bomnl',
  'place-gover',
  'place-state',
  'place-aqucl',

  'place-north',
  'place-haecl',
  'place-chncl',
  'place-tumnl',
  'place-bbsta',

  'place-lech',
  'place-spmnl',
  'place-boyls',
  'place-armnl',
  'place-coecl',
  'place-hymnl',
  'place-kencl',
  'place-bland',
  'place-buest',
  'place-bucen',
  'place-smary',
  'place-fenwy',
];

export const STATIONS_FILTERED = Object.entries(STATIONS)
  .filter(([id]) => targetStations.includes(id))
  .reduce((obj, [id, station]) => {
    obj[id] = station;
    return obj;
  }, {});

console.log(STATIONS_FILTERED);