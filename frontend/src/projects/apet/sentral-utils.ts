import { SheetValueType } from './utils.ts';

export const mapSentralToSheet = (
  fileEl: Element | undefined,
  globalEl: Element | undefined
): { [key: string]: SheetValueType }[] => {
  const row: { [key: string]: SheetValueType } = {};

  if (fileEl) {
    Array.from(fileEl.attributes).forEach((a) => {
      row[a.name] = a.value;
    });
  }

  if (globalEl) {
    Array.from(globalEl.attributes).forEach((a) => {
      const key = row[a.name] !== undefined ? `GD_${a.name}` : a.name;
      row[key] = a.value;
    });
  }

  return [row];
};
