import { FC, useState } from 'react';

import { Root } from '../../interfaces/jsonDataInterface';
import ExportForm from './ExportForm';
import ImportForm from './ImportForm';
import styles from './FeetPage.module.less';

const FeetPage: FC = () => {
  const [data, setData] = useState<Record<string, Root>>();

  return (
    <section className={styles.container}>
        <ExportForm data={data} setData={setData} />
      <ImportForm data={data} setData={setData} />
    </section>
  );
};

export default FeetPage;
