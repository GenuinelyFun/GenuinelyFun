import { useState } from 'react';

import Modal from '../../components/Modal.tsx';
import Table from '../../components/Table.tsx';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import { useModal } from '../../utils/useModal.ts';
import { FsRelationTagsCategories } from './fs-utils.tsx';
import { useFs } from './useFs.ts';

const RelationTagsCategories = () => {
  const [selectedItem, setSelectedItem] = useState<FsRelationTagsCategories>();
  const { relationTagsCategories } = useFs();
  const { translate } = useLanguageContext();
  const modal = useModal();

  const onCloseModal = () => {
    setSelectedItem(undefined);
    modal.closeModal();
  };
  if (relationTagsCategories === null || relationTagsCategories === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Table
        headers={[
          translate('fs.table-header.id'),
          translate('fs.table-header.tag-id'),
          translate('fs.table-header.category-id'),
        ]}
        tableBody={
          <tbody>
            {relationTagsCategories.map((item) => (
              <tr
                key={item.id}
                role={'button'}
                onClick={() => {
                  setSelectedItem(item);
                  modal.openModal();
                }}
              >
                <td>{item.id}</td>
                <td>{item.tagId}</td>
                <td>{item.categoryId}</td>
              </tr>
            ))}
          </tbody>
        }
      />
      {selectedItem && (
        <Modal isOpen={modal.isOpen} onClose={onCloseModal}>
          <h1>{selectedItem.id}</h1>
          <p>
            {translate('fs.table-header.tag-id')}: {selectedItem.tagId}
          </p>
          <p>
            {translate('fs.table-header.category-id')}:{' '}
            {selectedItem.categoryId}
          </p>
        </Modal>
      )}
    </>
  );
};

export default RelationTagsCategories;
