export const mapInnoFile = (inno: string[]) => {
  const addressWithKursRegex = /([A-Z0-9][A-Z0-9./-]*[0-9]+.*)\nKurs:.*\n 0/g;
  const addressOnlyRegex = /([A-Z0-9][A-Z0-9./-]*[0-9]+.*?) 0/g;
  const outputContent: string[][] = inno.map((text: string) => {
    const matches: string[] = [];
    let match;
    while ((match = addressWithKursRegex.exec(text)) !== null) {
      matches.push(
        match[1]
          .replace(/n/g, '\n')
          .replace(/\nSJEKKPUNKT ADRESSE-ENHET\\/g, '\n\n')
          .replace(/ 0/g, '\n') +
          ' ' +
          match[0]
            .split('\n')[1]
            .replace(/n/g, '\n')
            .replace(/\nSJEKKPUNKT ADRESSE-ENHET\\/g, '\n\n')
            .replace(/ 0/g, '\n')
      );
    }
    while ((match = addressOnlyRegex.exec(text)) !== null) {
      matches.push(
        match[1]
          .replace(/n/g, '\n')
          .replace(/\nSJEKKPUNKT ADRESSE-ENHET\\/g, '\n\n')
          .replace(/ 0/g, '\n')
          .trim()
      );
    }
    return matches;
  });
  return outputContent
    .flat()
    .map((row) => {
      return parseRow(row);
    })
    .filter((item) => item.Nr !== undefined);
};

const parseRow = (row: string) => {
  const parts = row
    .split(' ')
    .filter(
      (item) => item !== undefined && item.trim() !== '' && item.trim() !== '-'
    );

  if (parts.length < 4) {
    return {};
  }

  const mlOrLl = getMlOrLl(parts);

  const address = parts.splice(0, 1)[0];
  const floorNumber = getFloorNumber(parts.splice(0, 1)[0]);

  const kurs = parts.splice(-1, 1)[0];
  const plassering = parts.splice(0, 1)[0];

  return {
    Nr: address, //TODO not correct yet
    Etg: isNaN(Number(floorNumber)) ? floorNumber : Number(floorNumber),
    Plassering: `${plassering}${parts.indexOf('rom') !== -1 ? ' rom' : ''}`,
    Lystype: mlOrLl,
    Armatur: '',
    Spenning: '',
    Fordeling: '',
    Kurs: kurs,
    Batteri: '',
    Kommentar: row,
    Status: '',
  };
};

const getMlOrLl = (input: string[]): string => {
  return input.splice(
    input.findIndex(
      (item) => item.toUpperCase() === 'ML' || item.toUpperCase() === 'LL'
    ),
    1
  )[0];
};

export const getFloorNumber = (input: string): string | null => {
  // Regular expression patterns for different formats
  const patterns: { [key: string]: RegExp } = {
    U: /^(u|\s*u\s*(\d*\.?\d*)|etg)$/i, // Match u, u1, u.etg, u - , U, etc.
    K: /^k(\d+)$/i, // Matches "k", "k1", "K1", etc.
    Etg: /(\d+)\s*(etg|plan|etasje|U)?/i, // Matches "1.etg", "Etg.4", etc.
    Plan: /plan\s*(\d+|u?\d+)/i, // Matches "plan-2", "plan 5", etc.
    U1: /(u1|U1|kjeller|garasje|underetasje)/i, // Matches "U1", "kjeller", "garasje", etc.
  };

  // Try to match common patterns first
  if (patterns.U.test(input)) {
    return input.toUpperCase().replace(/[^A-Za-z0-9]/g, ''); // Match u.etg, u, U1 etc.
  }
  if (patterns.K.test(input)) {
    return input.toUpperCase().replace(/[^A-Za-z0-9]/g, ''); // "K1", "K", etc.
  }
  if (patterns.Etg.test(input)) {
    const match = input.match(patterns.Etg);
    if (match) {
      return match[1]; // Returns the number part, e.g. "1", "4", etc.
    }
  }
  if (patterns.Plan.test(input)) {
    const match = input.match(patterns.Plan);
    if (match) {
      return match[1]; // Returns the floor number or "U" part.
    }
  }
  if (patterns.U1.test(input)) {
    // If the input matches special cases like "kjeller", "garasje", "U1"
    return input.toUpperCase().replace(/[^A-Za-z0-9]/g, ''); // "U1", "kjeller", etc.
  }

  // If no match found, return the input as is
  return input.trim();
};
