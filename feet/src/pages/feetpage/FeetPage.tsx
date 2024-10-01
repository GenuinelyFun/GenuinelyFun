import { FC, useState } from 'react';

import { Root } from '../../interfaces/jsonDataInterface';
import ExportForm from './ExportForm';
import ImportForm from './ImportForm';
import styles from './FeetPage.module.less';

const FeetPage: FC = () => {
  const [data, setData] = useState<Root>();

  return (
    <section className={styles.container}>
      <ImportForm data={data} setData={setData} />
      <ExportForm data={data} />
    </section>
  );
};

export default FeetPage;
