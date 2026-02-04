const fs = require('fs');

async function refreshStationMetadata() {
  const response = await fetch('http://localhost:8000/stations');
  const data = await response.json();
  
  const fileContent = `export const STATIONS = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync('constants.js', fileContent);
}

refreshStationMetadata();