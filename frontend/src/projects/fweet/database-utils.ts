import { Database } from 'sql.js';

import { Toast } from '../../utils/useToast.ts';

export const getSiteName = (db: Database, toast: Toast): string => {
  const siteName = db.exec('SELECT Name FROM Site')[0].values[0][0];
  if (typeof siteName !== 'string' || siteName.length === 0) {
    toast({
      type: 'error',
      textKey: 'fweet.dataformat.error',
      textParams: { data: 'site name' },
    });
    return '';
  }
  return siteName;
};
