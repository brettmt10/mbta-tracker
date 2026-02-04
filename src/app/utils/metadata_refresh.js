const fs = require('fs');

async function refreshStationMetadata() {
  const response = await fetch('http://localhost:8000/stations');
  const data = await response.json();

  const supportedStationsRed = [
    'place-sstat',
    'place-dwnxg',
    'place-pktrm',
    'place-chmnl',
    'place-knncl',
    'place-cntsq',
    'place-harsq',
    'place-portr',
    'place-davis'
  ];
  
  let filtered = {};
  for (let parent_station of supportedStationsRed) {
    if (data[parent_station]){
      filtered[parent_station] = data[parent_station];
    }
  }

  const fileContent = `export const STATIONS_RED = ${JSON.stringify(filtered, null, 2)};\n`;
  fs.writeFileSync('constants.js', fileContent);
}

refreshStationMetadata();