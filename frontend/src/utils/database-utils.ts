import initSqlJs, { Database } from 'sql.js';

export const PANEL_COLUMNS = [
  'Id',
  'Number',
  'SlaveOn',
  'FirstMaster',
  'SlaveLevel',
  'Type',
  'Name',
  'SerialNumber',
  'SwVersion',
  'Language',
  'Country',
  'LastDownload',
  'EepromSize',
  'Description',
  'ExpCard',
  'Its2Card',
  'MimicPanel',
  'SmsSiteText',
  'SmsScaAdress',
  'SmsPinCode',
  'SmsCard',
  'SmsHBFreq',
  'SmsHBStartDay',
  'First',
];

export const PANEL_COLUMN_AMOUNT = 24;

export const IAmTryingOutSomeStuffOkaaaay = async (
  dbFile: Uint8Array<ArrayBufferLike>
): Promise<Database> => {
  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  });

  const db = new SQL.Database(dbFile);
  const stmt = db.prepare('SELECT * FROM Panel');
  //const result = stmt.getAsObject();
  const columns = stmt.getColumnNames();
  if (columns.length !== PANEL_COLUMN_AMOUNT) {
    console.error(
      `Expected ${PANEL_COLUMN_AMOUNT} columns, but got ${columns.length}`
    );
  } else if (
    Object.values(columns)
      .map((column) => PANEL_COLUMNS.includes(column))
      .includes(false)
  ) {
    console.error(
      `Expected columns ${PANEL_COLUMNS}, but got ${Object.values(columns)}`
    );
  }
  return db;
};
/*import initSqlJs, { Database } from 'sql.js';
// This function takes a File (an uploaded .sdb file) and returns a Promise
// that resolves to a JSON string representing the contents of the database.
export async function convertSdbToJson(file: File): Promise<string> {
  // Wrap FileReader in a Promise
  const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        resolve(event.target.result as ArrayBuffer);
      } else {
        reject(new Error('Failed to read file.'));
      }
    };        
    reader.onerror = () => reject(new Error('Error reading file.'));
    // Read the file as an ArrayBuffer (this is key for binary files)
    reader.readAsArrayBuffer(file);
  });
  // Initialize SQL.js. Adjust locateFile if needed to point to your wasm file.
  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  });
  // Create a new database using the file’s ArrayBuffer data.
  const uInt8Array = new Uint8Array(arrayBuffer);
  const db: Database = new SQL.Database(uInt8Array);
  // Query to get the names of all tables in the database.
  const tablesQuery = "SELECT name FROM sqlite_master WHERE type='table';";
  const tablesRes = db.exec(tablesQuery);
  // Build an array of table names.
  const tableNames: string[] = [];
  if (tablesRes.length > 0) {
    // Each row contains a table name.
    tablesRes[0].values.forEach((row: any) => {
      tableNames.push(row[0]);
    });
  }
  // For each table, run a SELECT query and format the results.
  const data: { [table: string]: any[] } = {};
  tableNames.forEach((tableName) => {
    const res = db.exec(`SELECT *
                             FROM ${tableName};`);
    if (res.length > 0) {
      const { columns, values } = res[0];
      data[tableName] = values.map((row) => {
        const rowObj: { [col: string]: any } = {};
        row.forEach((value: any, idx: number) => {
          rowObj[columns[idx]] = value;
        });
        return rowObj;
      });
    }
  });
  // Convert the data object to a nicely formatted JSON string.
  const jsonStr = JSON.stringify(data, null, 2);
  return jsonStr;
}*/

/*
//TODO NGHI this is from the heet branch, no idea what we're doing here.

export function extractAndFormatSQL(input: string): string {
  // 1. Remove all control characters, turning them into spaces (except line breaks).
  let text = input.replace(/[\x00-\x09\x0B-\x1F\x7F]/g, ' ');

  // 2. Remove or replace non-ASCII characters:
  text = text.replace(/[^\x20-\x7E\n\r]/g, ' ');

  // 3. Split by lines:
  const lines = text.split(/\r?\n/);

  // 4. Filter lines that might contain SQL (or partial SQL).
  const sqlKeywords =
    /(CREATE|INDEX|TABLE|INSERT|UPDATE|DELETE|SELECT|ALTER|DROP|FOREIGN KEY|PRIMARY KEY|REFERENCES)/i;
  const relevantLines: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      sqlKeywords.test(trimmed) ||
      trimmed.endsWith('(') ||
      trimmed.endsWith(',') ||
      trimmed.endsWith(';') ||
      trimmed.includes('FOREIGN KEY') ||
      trimmed.includes('PRIMARY KEY') ||
      trimmed.includes('REFERENCES') ||
      trimmed.length === 0
    ) {
      // If the line is empty (trimmed.length === 0) it might be spacing between SQL statements
      relevantLines.push(trimmed);
    }
  }

  // 5. Re-combine into a single block of text.
  let combinedSQL = relevantLines.join('\n');

  // 6. Basic formatting:
  function basicSQLFormatting(sql: string): string {
    // Insert newlines before big keywords (but not parentheses):
    let result = sql
      // new line before these major statements or clauses
      .replace(
        /\b(CREATE|INDEX|TABLE|INSERT INTO|UPDATE|DELETE FROM|SELECT|ALTER TABLE|DROP TABLE)\b/gi,
        '\n$1'
      )
      // Also do for references to break up lines
      .replace(
        /\b(FOREIGN KEY|PRIMARY KEY|UNIQUE|REFERENCES|ON DELETE|ON UPDATE)\b/gi,
        '\n$1'
      )

      // Indent AND/OR
      .replace(/\b(AND|OR)\b/gi, '\n    $1')

      // Remove multiple blank lines:
      .replace(/\n{2,}/g, '\n');

    // We won't forcibly break parentheses onto their own lines here.
    // We let them remain where they are unless they're already on separate lines.

    // Trim leading/trailing whitespace
    result = result.trim();
    return result;
  }

  combinedSQL = basicSQLFormatting(combinedSQL);

  // 7. Return it with a code fence if you like:
  return '```sql\n' + combinedSQL + '\n```';
}


 */