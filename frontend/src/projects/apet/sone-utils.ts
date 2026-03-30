import { attr, SheetValueType } from './utils.ts';

export const mapSoneToSheet = (
  doc: Document
): { [key: string]: SheetValueType }[] =>
  [
    ...Array.from(doc.getElementsByTagName('DZ')),
    ...Array.from(doc.getElementsByTagName('AZ')),
  ].map((z) => ({
    Funksjon: attr(z, 'Func'),
    ID: attr(z, 'Id'),
    'Sone navn': attr(z, 'Name'),
    'Sone Ids': attr(z, 'Ids'),
    'Sone foreldre': attr(z, 'Parent'),
  }));
