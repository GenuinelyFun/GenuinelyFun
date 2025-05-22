import { Workbook } from 'exceljs';

import { Root } from '../projects/feet/feetJsonDataInterface.ts';
import {
  sheetTranslateMapper,
  sheetTranslateType,
  SheetValueType,
} from '../projects/feet/utils/utils.ts';

const getTableHeaders = (
  data: { [key: string]: SheetValueType }[]
): { name: string; key: string; filterButton: boolean }[] => {
  const headers: { name: string; key: string; filterButton: boolean }[] = [];
  data.forEach((item) =>
    Object.keys(item).forEach((key) => {
      if (headers.find((item) => item.key === key) === undefined) {
        headers.push({
          name: key,
          key: key,
          filterButton: true,
        });
      }
    })
  );
  return headers;
};

const getTableRows = (
  data: { [key: string]: SheetValueType }[],
  headers: {
    name: string;
    key: string;
    filterButton: boolean;
  }[]
): SheetValueType[][] => {
  const rows: SheetValueType[][] = [];
  data.forEach((row) => {
    const newRow: SheetValueType[] = [];
    headers.forEach((column) => {
      if (row[column.key] !== undefined) {
        newRow.push(row[column.key]);
      } else {
        newRow.push(null);
      }
    });
    rows.push(newRow);
  });

  return rows;
};

export const addFeetSheetToWorkbook = (
  workbook: Workbook,
  data: { [key: string]: SheetValueType }[],
  sheetName: string,
  json: Root,
  sheetTranslate: sheetTranslateType
) => {
  const translatedSheetName = sheetTranslate(sheetName)!.toString();
  const sheet = workbook.addWorksheet(translatedSheetName);
  const translatedData = sheetTranslateMapper(data, sheetTranslate);
  sheet.addRow([
    sheetTranslate('Configuration number') + ': ' + json.version.number,
  ]);

  const columns = getTableHeaders(translatedData);
  sheet.addTable({
    name: translatedSheetName,
    ref: 'A2',
    headerRow: true,
    columns: columns,
    rows: getTableRows(translatedData, columns),
    style: {
      theme: 'TableStyleLight1',
      showRowStripes: true,
    },
  });
  sheet.columns.forEach((column) => {
    let dataMax = 0;
    column?.eachCell?.({ includeEmpty: true }, function (cell) {
      const columnLength = cell.value?.toString().length || 0;
      if (columnLength > dataMax) {
        dataMax = columnLength;
      }
    });
    column.width = dataMax < 10 ? 10 : dataMax;
  });
  sheet.eachRow({ includeEmpty: true }, function (row) {
    if (sheetName === 'Control group report' && row.number === 2) {
      row.eachCell({ includeEmpty: true }, function (cell) {
        if (Number(cell.col) <= 7) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'E2B9B2' },
          };
        } else {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '92AEBB' },
          };
        }
      });
    }
    row.eachCell({ includeEmpty: true }, function (cell) {
      cell.alignment = {
        horizontal: 'left',
      };
    });
  });
};

export const addFweetSheetToWorkbook = (
  workbook: Workbook,
  data: { [key: string]: SheetValueType }[],
  sheetName: string,
  siteName: string
) => {
  const sheet = workbook.addWorksheet(sheetName);
  sheet.addRow(['Sitename: ' + siteName]);

  const columns = getTableHeaders(data);
  sheet.addTable({
    name: sheetName,
    ref: 'A2',
    headerRow: true,
    columns: columns,
    rows: getTableRows(data, columns),
    style: {
      theme: 'TableStyleLight1',
      showRowStripes: true,
    },
  });
  sheet.columns.forEach((column) => {
    const LOGBOOK_MAX_WIDTH = 55;
    let dataMax = 0;
    column?.eachCell?.({ includeEmpty: true }, function (cell) {
      const columnLength = cell.value?.toString().length || 0;
      if (columnLength > dataMax) {
        dataMax = columnLength;
      }
    });
    if (sheetName === 'Logbook') {
      column.width = dataMax > LOGBOOK_MAX_WIDTH ? LOGBOOK_MAX_WIDTH : dataMax;
    } else {
      column.width = dataMax < 10 ? 10 : dataMax;
    }
  });
  sheet.eachRow({ includeEmpty: true }, function (row) {
    row.eachCell({ includeEmpty: true }, function (cell) {
      cell.alignment = {
        horizontal: 'left',
      };
    });
  });
};

export const INNO_COLUMN_HEADERS = [
  'Nr',
  'Etg',
  'Plassering',
  'Lystype',
  'Armatur',
  'Spenning',
  'Fordeling',
  'Kurs',
  'Batteri',
  'Kommentar',
  'Status',
];
export const addInnoSheetToWorkbook = (
  workbook: Workbook,
  data: { [key: string]: SheetValueType }[]
) => {
  const sheet = workbook.addWorksheet('Armaturliste');

  const columns = INNO_COLUMN_HEADERS.map((header) => ({
    name: header,
    key: header,
    filterButton: true,
  }));
  sheet.addTable({
    name: 'Armaturliste',
    ref: 'A1',
    headerRow: true,
    columns: columns,
    rows: getTableRows(data, columns),
    style: {
      theme: 'TableStyleLight1',
      showRowStripes: true,
    },
  });
  sheet.columns.forEach((column) => {
    let dataMax = 0;
    column?.eachCell?.({ includeEmpty: true }, function (cell) {
      const columnLength = cell.value?.toString().length || 0;
      if (columnLength > dataMax) {
        dataMax = columnLength;
      }
    });
    column.width = dataMax < 10 ? 10 : dataMax;
  });
  sheet.eachRow({ includeEmpty: true }, function (row) {
    row.eachCell({ includeEmpty: true }, function (cell) {
      cell.alignment = {
        horizontal: 'left',
      };
    });
  });
};
