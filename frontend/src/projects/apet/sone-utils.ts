import { attr, SheetValueType } from './utils.ts';

export const mapSoneToSheet = (
  doc: Document
): { [key: string]: SheetValueType }[] =>
  [
    ...Array.from(doc.getElementsByTagName('DZ')),
    ...Array.from(doc.getElementsByTagName('AZ')),
  ].map((z) => {
    const inEl = z.getElementsByTagName('IN')[0];
    const soneIds = inEl
      ? Array.from(inEl.getElementsByTagName('REF'))
          .map((r) => attr(r, 'Id'))
          .filter(Boolean)
          .join(' ')
      : attr(z, 'Ids');
    return {
      Funksjon: attr(z, 'Func'),
      ID: attr(z, 'Id'),
      'Sone navn': attr(z, 'Name'),
      'Sone Ids': soneIds,
      'Sone foreldre': attr(z, 'Parent') || attr(z, 'Oz'),
    };
  });
