import { mapAdresseRapportToSheet } from './adresse-rapport-utils.ts';
import { mapIoRapportToSheet } from './io-rapport-utils.ts';
import { mapSammendragToSheet } from './sammendrag-utils.ts';
import { mapSentralToSheet } from './sentral-utils.ts';
import { mapSloeyfeToSheet } from './sloeyfe-utils.ts';
import { mapSoneToSheet } from './sone-utils.ts';
import { ApetSheetData } from './utils.ts';

export type { ApetSheetData };

export const mapApetToSheets = (xmlString: string): ApetSheetData => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'application/xml');

  const fileEl = doc.getElementsByTagName('FILE')[0] as Element | undefined;
  const globalEl = doc.getElementsByTagName('GLOBAL_DATA')[0] as
    | Element
    | undefined;

  const siteName = fileEl?.getAttribute('SiteName') ?? '';

  const { slyfe, typeCounts, aktiveSloeyfer } = mapSloeyfeToSheet(doc);

  return {
    siteName,
    sammendrag: mapSammendragToSheet(siteName, aktiveSloeyfer, typeCounts),
    sentral: mapSentralToSheet(fileEl, globalEl),
    sone: mapSoneToSheet(doc),
    slyfe,
    adresseRapport: mapAdresseRapportToSheet(doc),
    ioRapport: mapIoRapportToSheet(doc),
  };
};
