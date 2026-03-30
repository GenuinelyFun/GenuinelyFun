import { attr, SheetValueType } from './utils.ts';

export const mapIoRapportToSheet = (
  doc: Document
): { [key: string]: SheetValueType }[] => {
  const ioRapport: { [key: string]: SheetValueType }[] = [];
  const obIo = doc.getElementsByTagName('OB_IO')[0];

  if (obIo) {
    (['FAD', 'OUT', 'INP'] as const).forEach((tag) => {
      Array.from(obIo.getElementsByTagName(tag)).forEach((el) => {
        ioRapport.push({
          ID: attr(el, 'Id'),
          Navn: attr(el, 'Name'),
          Funksjon: attr(el, 'Func'),
          Hardware: attr(el, 'Hardware'),
          Aktiveringsforsinkelse: attr(el, 'ActDel'),
          'Aktiveringsgruppe av.': attr(el, 'ActGrpDep'),
          'Umiddelbar aktivering': attr(el, 'ImmAct'),
          Overvåking: attr(el, 'SupVi'),
        });
      });
    });
  }

  return ioRapport;
};
