import { SheetValueType } from './utils.ts';

export const mapSammendragToSheet = (
  siteName: string,
  aktiveSloeyfer: number,
  typeCounts: Record<string, number>
): { [key: string]: SheetValueType }[] => {
  const row: { [key: string]: SheetValueType } = {
    Sentralnummer: 1,
    Anleggsnavn: siteName,
    'Aktive sløyfer': aktiveSloeyfer,
  };
  Object.entries(typeCounts).forEach(([type, count]) => {
    row[type] = count;
  });
  return [row];
};
