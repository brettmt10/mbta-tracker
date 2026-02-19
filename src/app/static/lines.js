import { STATIONS } from './stations_all.js';
import { TARGET_STATIONS } from './stations_target_ids.js';
import { extractSupportedStations } from '../utils/extract_supported_stations.js';

const stationsFiltered = extractSupportedStations(STATIONS, TARGET_STATIONS);

export const redLine = {
  'place-sstat': stationsFiltered['place-sstat'],
  'place-dwnxg': stationsFiltered['place-dwnxg'],
  'place-pktrm': stationsFiltered['place-pktrm'],
  'place-chmnl': stationsFiltered['place-chmnl'],
  'place-knncl': stationsFiltered['place-knncl'],
  'place-cntsq': stationsFiltered['place-cntsq'],
  'place-harsq': stationsFiltered['place-harsq'],
  'place-portr': stationsFiltered['place-portr'],
  'place-davis': stationsFiltered['place-davis'],
};

export const blueLine = {
  'place-bomnl': stationsFiltered['place-bomnl'],
  'place-gover': stationsFiltered['place-gover'],
  'place-state': stationsFiltered['place-state'],
  'place-aqucl': stationsFiltered['place-aqucl'],
};

export const orangeLine = {
  'place-north': stationsFiltered['place-north'],
  'place-haecl': stationsFiltered['place-haecl'],
  'place-state': stationsFiltered['place-state'],
  'place-dwnxg': stationsFiltered['place-dwnxg'],
  'place-chncl': stationsFiltered['place-chncl'],
  'place-tumnl': stationsFiltered['place-tumnl'],
  'place-bbsta': stationsFiltered['place-bbsta'],
};

export const greenLineTrunk = {
  'place-lech':  stationsFiltered['place-lech'],
  'place-spmnl': stationsFiltered['place-spmnl'],
  'place-north': stationsFiltered['place-north'],
  'place-haecl': stationsFiltered['place-haecl'],
  'place-gover': stationsFiltered['place-gover'],
  'place-pktrm': stationsFiltered['place-pktrm'],
  'place-boyls': stationsFiltered['place-boyls'],
  'place-armnl': stationsFiltered['place-armnl'],
  'place-coecl': stationsFiltered['place-coecl'],
  'place-hymnl': stationsFiltered['place-hymnl'],
  'place-kencl': stationsFiltered['place-kencl'],
};

export const greenLineB = {
  'place-bland': stationsFiltered['place-bland'],
  'place-buest': stationsFiltered['place-buest'],
  'place-bucen': stationsFiltered['place-bucen'],
};

export const greenLineC = {
  'place-smary': stationsFiltered['place-smary'],
};

export const greenLineD = {
  'place-fenwy': stationsFiltered['place-fenwy'],
};

export const greenLineE = {
  'place-prmnl': stationsFiltered['place-prmnl'],
};