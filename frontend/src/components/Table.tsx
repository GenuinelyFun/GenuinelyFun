import { FC, ReactNode } from 'react';

import styles from './Table.module.less';

interface TableProps {
  headers: string[];
  tableBody: ReactNode;
}

const Table: FC<TableProps> = ({ headers, tableBody }) => {
  return (
    <table className={styles.list}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      {tableBody}
    </table>
  );
};

export default Table;
