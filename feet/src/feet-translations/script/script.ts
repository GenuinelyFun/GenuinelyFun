import * as fs from 'fs';
import * as path from 'path';

interface JsonObject {
  [key: string]: any;
}

function flattenJson(nestedJson: JsonObject): string {
  let flatJson = '';

  // List of allowed parent keys
  const allowedKeys = [
    'configuration.deviceScan',
    'configuration.deviceScan.Grid',
    'configuration.grid.header',
    'configuration.option.alarmModeMenu',
    'configuration.option.alcDetector',
    'configuration.option.alcTone',
    'configuration.option.alcToneVolume',
    'configuration.option.clcDetector',
    'configuration.option.contact',
    'configuration.option.dayMode',
    'configuration.option.elcDetector',
    'configuration.option.elcTone',
    'configuration.option.environment',
    'configuration.option.inputChannelEsmiImpresia',
    'configuration.option.inputDelay',
    'configuration.option.inputFilter',
    'configuration.option.inputFunction',
    'configuration.option.iocMode',
    'configuration.option.lcDetector',
    'configuration.option.mcioInputFunction',
    'configuration.option.mcioMode',
    'configuration.option.mcioOutputFunction',
    'configuration.option.monitored',
    'configuration.option.outputControl',
    'configuration.option.outputFunction',
    'configuration.option.outputMode',
    'configuration.option.productType',
    'configuration.option.sensitivityLevel',
    'configuration.option.slcDetector',
    'configuration.option.slcMiscAddress',
    'configuration.option.slcTone',
    'configuration.option.sounderOutputMode',
    'configuration.option.yesNo',
    'configuration.option.zoneDisables',
    'configuration.outputController',
    'configuration.panel.connections',
    'configuration.panel.eventrecording',
    'configuration.panel.firedoorcontrol',
    'configuration.panel.loopcontrollers',
    'configuration.panel.misc',
    'configuration.panel.specialalarm',
    'contamination.addressList',
    'country',
  ];

  // Iterate over all key-value pairs in the object
  Object.keys(nestedJson).forEach((key) => {
    if (allowedKeys.includes(key)) {
      const value = nestedJson[key];

      // If value is an object and contains the final key-value pair, concatenate them
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.keys(value).forEach((subKey) => {
          flatJson += `"${subKey}": "${value[subKey]}",\n`; // Build the string representation
        });
      }
    }
  });

  return flatJson;
}

// Define the file paths
const inputFilePath = path.join(__dirname, 'translate.en-nb.json'); // Path to input.json
const outputFilePath = path.join(__dirname, 'Script-output.json'); // Path to output.json

// Load your JSON file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading input file:', err);
    return;
  }

  // Parse the input JSON data
  const nestedJson: JsonObject = JSON.parse(data);

  // Flatten the JSON structure by removing top-level keys and concatenating inner values
  const flattenedData = flattenJson(nestedJson).slice(0, -2); // Removing last comma and adding final braces

  // Remove duplicate lines, keeping unique lines only (case insensitive)
  const lines = flattenedData.split('\n');
  const uniqueLinesMap: { [key: string]: string } = {};

  lines.forEach((line) => {
    const match = line.match(/^"(.*?)":/);
    if (match) {
      const key = match[1].toLowerCase();
      if (!uniqueLinesMap[key]) {
        uniqueLinesMap[key] = line;
      }
    }
  });

  const uniqueLines = Object.values(uniqueLinesMap).join('\n');

  const finalData = `{
${uniqueLines}
}`;

  // Save the flattened JSON (with unique keys) to the output file
  fs.writeFile(outputFilePath, finalData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing output file:', err);
      return;
    }

    console.log(
      `Flattened JSON (with unique keys) has been written to ${outputFilePath}`,
    );
  });
});
