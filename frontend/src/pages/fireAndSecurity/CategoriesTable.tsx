import Table from '../../components/Table.tsx';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import { useFs } from './useFs.ts';

const relationProductsTagsTable = () => {
  const { relationProductsTags } = useFs();
  const { translate } = useLanguageContext();

  if (relationProductsTags === null || relationProductsTags === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Table
        headers={[
          translate('fs.table-header.id'),
          translate('fs.table-header.title'),
          translate('fs.table-header.background-color'),
          translate('fs.table-header.font-color'),
        ]}
        tableBody={
          <tbody>
            {relationProductsTags.map((item) => (
              <tr key={item.id} role={'button'}>
                <td>{item.id}</td>
                <td>{item.productId}</td>
                <td>{item.tagId}</td>
              </tr>
            ))}
          </tbody>
        }
      />
    </>
  );
};

export default relationProductsTagsTable;
