import { Database } from 'sql.js';

import { Toast } from '../../utils/useToast.ts';

export const groupMapper = (db: Database, toast: Toast) => {
  const groups = db.exec('SELECT * FROM AlZone');

  if (groups.length === 0) {
    toast({ type: 'error', textKey: 'fweet.export.error' });
    return [];
  }

  return groups[0].values.map((row) => {
    const result: { [key: string]: string } = {};
    groups[0].columns.forEach((column, index) => {
      result[column] = row[index] === null ? 'n/a' : (row[index] as string);
    });
    return result;
  });
};
