import { redLine, blueLine, orangeLine, greenLineTrunk, greenLineB, greenLineC, greenLineD, greenLineE } from './lines.js';

const kenmore = greenLineTrunk['place-kencl'].coords;
const copley  = greenLineTrunk['place-coecl'].coords;

export const redCoords = Object.values(redLine).map(s => s.coords);
export const orangeCoords = Object.values(orangeLine).map(s => s.coords);
export const blueCoords = Object.values(blueLine).map(s => s.coords);
export const greenTrunkCoords = Object.values(greenLineTrunk).map(s => s.coords);
export const greenBCoords = [kenmore, ...Object.values(greenLineB).map(s => s.coords)];
export const greenCCoords = [kenmore, ...Object.values(greenLineC).map(s => s.coords)];
export const greenDCoords = [kenmore, ...Object.values(greenLineD).map(s => s.coords)];
export const greenECoords = [copley,  ...Object.values(greenLineE).map(s => s.coords)];