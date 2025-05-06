import { useState } from 'react';

import Modal from '../../components/Modal.tsx';
import Table from '../../components/Table.tsx';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import { useModal } from '../../utils/useModal.ts';
import { FsRelationProductsTags } from './fs-utils.tsx';
import { useFs } from './useFs.ts';

const RelationProductsTags = () => {
  const [selectedItem, setSelectedItem] = useState<FsRelationProductsTags>();
  const { relationProductsTags } = useFs();
  const { translate } = useLanguageContext();
  const modal = useModal();

  const onCloseModal = () => {
    setSelectedItem(undefined);
    modal.closeModal();
  };
  if (relationProductsTags === null || relationProductsTags === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Table
        headers={[
          translate('fs.table-header.id'),
          translate('fs.table-header.product-id'),
          translate('fs.table-header.tag-id'),
        ]}
        tableBody={
          <tbody>
            {relationProductsTags.map((item) => (
              <tr
                key={item.id}
                role={'button'}
                onClick={() => {
                  setSelectedItem(item);
                  modal.openModal();
                }}
              >
                <td>{item.id}</td>
                <td>{item.productId}</td>
                <td>{item.tagId}</td>
              </tr>
            ))}
          </tbody>
        }
      />
      {selectedItem && (
        <Modal isOpen={modal.isOpen} onClose={onCloseModal}>
          <h1>{selectedItem.id}</h1>
          <p>
            {translate('fs.table-header.product-id')}: {selectedItem.productId}
          </p>
          <p>
            {translate('fs.table-header.tag-id')}: {selectedItem.tagId}
          </p>
        </Modal>
      )}
    </>
  );
};

export default RelationProductsTags;
