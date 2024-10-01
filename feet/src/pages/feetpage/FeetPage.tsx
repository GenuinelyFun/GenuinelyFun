import { FC, useState } from 'react';

import { Root } from '../../interfaces/jsonDataInterface';
import ExportForm from './ExportForm';
import ImportForm from './ImportForm';
import './FeetPage.css';

const FeetPage: FC = () => {
  const [data, setData] = useState<Root>();

  return (
    <div className="upload-window">
      <ImportForm data={data} setData={setData} />
      <ExportForm data={data} />
    </div>
  );
};

export default FeetPage;
