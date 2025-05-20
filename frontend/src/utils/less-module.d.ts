declare module '*.module.less' {
  const resource: { [key: string]: string };
  export = resource;
}

declare module 'sql-parse';

/*declare module 'sql.js' {
  /*
  export function initSqlJs(config?: any): Promise<any>;

  export class Database {
    constructor(data: Uint8Array);

    exec(sql: string): any[];

    close(): void;
  }
   */
//}
