import { SheetValueType } from './feet/utils/utils.ts';

const normalizeAddressFormat = (content: string): string => {
  // Dynamic regex to match addresses like BL28.02.012 or BL28 02.012
  // Pattern: 2 letters, 2 digits, (dot or space), 2 digits, dot, 3 digits
  const addressFormatRegex = /([A-Z]{2})(\d{2})([ .])(\d{2})\.(\d{3})/g;
  return content.replace(addressFormatRegex, '$1$2.$4.$5');
};

export const mapInnoFile = (
  inno: string[]
): {
  [key: string]: SheetValueType;
}[] => {
  // Normalize address formats (e.g., BL28 02.012 to BL28.02.012)
  let normalizedContent = inno.map((text) => normalizeAddressFormat(text));

  // Preprocess input content
  // Insert newline before address lines starting with building code
  normalizedContent = normalizedContent.map((text) =>
    text.replace(/([^\n])\n(BL\d{2}[ .0-9A-Za-z/-]*- .*?)(?=\n|$)/g, '$1\n\n$2')
  );
  // Regex for matching addresses with a 'Kurs' line
  const addressWithKursRegex =
    /([A-Z0-9]+(?:\.[A-Z0-9]+)+.*?)\nKurs:.*?\n[] 0/g;
  // Regex for matching addresses without a 'Kurs' line
  const addressOnlyRegex =
    /([A-Z0-9]+(?:\.[A-Z0-9]+)+.*?(?:- (?:ML|LL).*?)?)[] 0/g;

  // Process each input string
  const outputContent: string[][] = normalizedContent.map((text: string) => {
    const matches: string[] = [];
    let match;

    // Process addresses with 'Kurs' line
    while ((match = addressWithKursRegex.exec(text)) !== null) {
      let addressPart = match[1];
      // NEW: Normalize BLXX.YY.ZZZ- to BLXX.YY.ZZZ -
      addressPart = addressPart.replace(/(BL\d{2}\.\d{2}\.\d{3})-/g, '$1 - ');

      const cleanedAddressPart = addressPart
        // Replace 'n' with newline
        .replace(/n/g, '\n')
        // Replace checkpoint marker with double newline
        .replace(/\nSJEKKPUNKT ADRESSE-ENHET\\/g, '\n\n')
        // Remove trailing marker
        .replace(/[] 0/g, '\n');

      const kursLine = match[0]
        .split('\n')[1]
        // Replace 'n' with newline
        .replace(/n/g, '\n')
        // Replace 'n' with newline
        .replace(/n/g, '\n')
        // Replace checkpoint marker with double newline
        .replace(/\nSJEKKPUNKT ADRESSE-ENHET\\/g, '\n\n')
        // Remove trailing marker
        .replace(/ 0/g, '\n');

      matches.push(cleanedAddressPart.trim() + ' ' + kursLine.trim());
    }

    // Process addresses without 'Kurs' line
    while ((match = addressOnlyRegex.exec(text)) !== null) {
      let addressPart = match[1];
      // NEW: Normalize BLXX.YY.ZZZ- to BLXX.YY.ZZZ -
      addressPart = addressPart.replace(/(BL\d{2}\.\d{2}\.\d{3})-/g, '$1 - ');

      matches.push(
        // Clean and format matched address
        addressPart
          // Replace 'n' with newline
          .replace(/n/g, '\n')
          // Replace checkpoint marker with double newline
          .replace(/\nSJEKKPUNKT ADRESSE-ENHET\\/g, '\n\n')
          // Remove trailing marker
          .replace(/ 0/g, '\n')
          // Remove trailing whitespace
          .trim()
      );
    }

    return matches;
  });

  return outputContent.flatMap((row) => row.map((string) => parseRow(string)));
};

const parseRow = (
  row: string
): {
  Nr: string;
  Etg: SheetValueType;
  Plassering: string;
  Lystype: string;
  Armatur: string;
  Spenning: string;
  Fordeling: string;
  Kurs: string;
  Batteri: string;
  Kommentar: string;
  Status: string;
} => {
  const parts = row
    .split(' ')
    .map((item) => item.split(' - '))
    .flat()
    .filter(
      (item) => item !== undefined && item.trim() !== '' && item.trim() !== '-'
    );

  const mlOrLl = getMlOrLl(parts);

  let indexOfEtg = parts.findIndex((item) =>
    item.toLowerCase().includes('etg')
  );

  let floorNumber = '';
  if (indexOfEtg !== -1) {
    const match = parts[indexOfEtg].match(/(etg)\.(\w+)/i);
    if (match !== null && match.length > 2) {
      parts.splice(indexOfEtg, 1, match[1], match[2]);
    }
  }

  indexOfEtg = parts.findIndex((item) => item.toLowerCase().includes('etg'));
  if (indexOfEtg !== -1) {
    const prev = getValidFloorNumber(parts[indexOfEtg - 1]);
    const next = getValidFloorNumber(parts[indexOfEtg]);
    if (next !== '') {
      parts.splice(indexOfEtg, 1);
      floorNumber = next;
    } else if (prev !== '') {
      parts.splice(indexOfEtg - 1, 2);
      floorNumber = prev;
    }
  }

  const address = parts.splice(0, 1)[0];
  const plassering = parts.join(' ');

  return {
    Nr: address, //TODO not correct yet
    Etg: floorNumber,
    Plassering: plassering,
    Lystype: mlOrLl,
    Armatur: '',
    Spenning: '',
    Fordeling: '',
    Kurs: '',
    Batteri: '',
    Kommentar: row,
    Status: '',
  };
};

const getMlOrLl = (input: string[]): string => {
  const indexOfMlOrLl = input.findIndex(
    (item) => item.toUpperCase() === 'ML' || item.toUpperCase() === 'LL'
  );
  if (indexOfMlOrLl !== -1) {
    return input.splice(indexOfMlOrLl, 1)[0];
  }
  return '';
};

const getValidFloorNumber = (input: string): string => {
  const cleanedInput = input.replace('.', '').trim().toUpperCase();
  if (cleanedInput.toUpperCase().includes('U')) {
    return getFloorNumber(cleanedInput);
  }

  return cleanedInput.match(/\d+/g)?.[0] || '';
};

export const getFloorNumber = (input: string): string => {
  // Regular expression patterns for different formats
  const patterns: { [key: string]: RegExp } = {
    U: /^(u)|\s*u\s*\d*\.?\d*etg$/i, // Match u, u1, u.etg, u - , U, etc.
    K: /^k(\d+)$/i, // Matches "k", "k1", "K1", etc.
    Etg: /(\d+)\s*(etg|plan|etasje|U)?/i, // Matches "1.etg", "Etg.4", etc.
    Plan: /plan\s*(\d+|u?\d+)/i, // Matches "plan-2", "plan 5", etc.
    U1: /(u1|U1|kjeller|garasje|underetasje)/i, // Matches "U1", "kjeller", "garasje", etc.
  };

  const upperedInput = input.toUpperCase();

  // Try to match common patterns first
  if (patterns.U.test(upperedInput)) {
    return upperedInput.match(patterns.U)?.[0] || ''; // Match u.etg, u, U1 etc.
  }
  if (patterns.K.test(upperedInput)) {
    return input.toUpperCase().replace(/[^A-Za-z0-9]/g, ''); // "K1", "K", etc.
  }
  if (patterns.Etg.test(upperedInput)) {
    const match = input.match(patterns.Etg);
    console.log('Etg match:', match + ' Tell developer if you see this.');
    if (match) {
      return match[1]; // Returns the number part, e.g. "1", "4", etc.
    }
  }
  if (patterns.Plan.test(upperedInput)) {
    const match = input.match(patterns.Plan);
    console.log('Plan match:', match + ' Tell developer if you see this.');
    if (match) {
      return match[1]; // Returns the floor number or "U" part.
    }
  }
  if (patterns.U1.test(upperedInput)) {
    // If the input matches special cases like "kjeller", "garasje", "U1"
    return input.toUpperCase().replace(/[^A-Za-z0-9]/g, ''); // "U1", "kjeller", etc.
  }

  // If no match found, return the input as is
  return input.trim();
};
