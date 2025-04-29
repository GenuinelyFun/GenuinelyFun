import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface JsonObject {
  [key: string]: never; // was any before.
}

function flattenJson(nestedJson: JsonObject): string {
  let flatJson = '';

  // List of allowed parent keys
  const allowedKeys = [
    'design.summary.LoopController',
    'configuration.grid.celleditor.controllc',
    'firesystem.functionaltype.Description',
    'orientationMap.objectExplorer.state',
    'configuration.address.filters.ALCGrid',
    'firesystem.monitor.PanelStructure',
    'configuration.powerSupply',
    'configuration.inputOutputController',
    'firesystem.monitor.Disable',
    'configuration.systemPanels',
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
    'configuration.mcuio.monitoredrelayoutput.grid.column.monitored',
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

const availableLanguages = ['da', 'en', 'es', 'fi', 'it', 'nb', 'ru', 'sv']; // List of available language codes

// Load the manual translations and the main translations
fs.readFile(
  path.join(path.join(__dirname), 'translate.manual.json'),
  'utf8',
  (err, manualData) => {
    if (err) {
      console.error('Error reading manual file:', err);
      return;
    }

    availableLanguages.forEach((language) => {
      // Set base paths
      const scriptBasePath = path.join(__dirname); // Path to script folder
      const translationsBasePath = path.resolve(scriptBasePath, '..'); // Parent folder containing translations

      // Define paths to script files and manual translations
      const inputFilePath = path.join(
        scriptBasePath,
        `translate.en-${language}.json`
      ); // Dynamic input file path based on language
      const outputFilePath = path.join(
        translationsBasePath,
        `feet-translate.en-${language}.json`
      ); // Dynamic output file path based on language

      const manualJson: JsonObject = JSON.parse(manualData);
      const manualKey = `translate.manual.en-${language}`;
      let manualFlattenedData = '';

      if (manualJson[manualKey]) {
        // Flatten the manual translations first
        const manualEntries = manualJson[manualKey];
        Object.keys(manualEntries).forEach((key) => {
          manualFlattenedData += `"${key}": "${manualEntries[key]}",\n`;
        });
      } else {
        console.warn(
          `No manual translations found for language code: ${language}`
        );
      }

      // Load the main translation file
      fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading input file:', err);
          return;
        }

        // Parse the input JSON data
        const nestedJson: JsonObject = JSON.parse(data);

        // Flatten the JSON structure by removing top-level keys and concatenating inner values
        const flattenedData = flattenJson(nestedJson).slice(0, -2); // Removing last comma and adding final braces

        // Remove duplicate lines, keeping unique lines only, but allow different cases (e.g., "true": "True", "TRUE": "True")
        const combinedData = manualFlattenedData + flattenedData;
        const lines = combinedData.split('\n');
        const uniqueLinesMap: { [key: string]: string[] } = {};

        // Iterate through lines and handle case-insensitive duplicates correctly
        lines.forEach((line) => {
          const match = line.match(/^"(.*?)":/);
          if (match !== null) {
            const key = match[1];
            const lowerCaseKey = key.toLowerCase();

            // If the key exists but with a different case, we allow both entries
            if (!uniqueLinesMap[lowerCaseKey]) {
              uniqueLinesMap[lowerCaseKey] = [line];
            } else {
              // Check if the current key has the same case as any existing one
              const existingEntryWithSameCase = uniqueLinesMap[
                lowerCaseKey
              ].find(
                (existingLine) => existingLine.match(/^"(.*?)":/)?.[1] === key
              );

              // If no existing entry with the same case, we add the new case variant
              if (!existingEntryWithSameCase) {
                uniqueLinesMap[lowerCaseKey].push(line);
              }
            }
          }
        });

        // Flatten uniqueLinesMap into an array of lines
        const uniqueLines = Object.values(uniqueLinesMap).flat();

        // Format the unique lines to ensure there is no trailing comma on the last line
        const formattedLines = uniqueLines
          .map((line, index) => {
            if (index === uniqueLines.length - 1) {
              return line.replace(/,$/, ''); // Last line without comma
            } else {
              return line.replace(/,$/, '') + ','; // Add a comma to all lines except the last one
            }
          })
          .join('\n');

        const finalData = `{
${formattedLines}
}`;

        // Clear the output file and then write the new data
        fs.writeFile(outputFilePath, '', 'utf8', (clearErr) => {
          if (clearErr) {
            console.error('Error clearing output file:', clearErr);
            return;
          }

          // Write the flattened JSON (with unique keys) to the output file
          fs.writeFile(outputFilePath, finalData, 'utf8', (writeErr) => {
            if (writeErr) {
              console.error('Error writing output file:', writeErr);
              return;
            }

            console.log(
              `Flattened JSON (with unique keys) has been written to ${outputFilePath}`
            );
          });
        });
      });
    });
  }
);
