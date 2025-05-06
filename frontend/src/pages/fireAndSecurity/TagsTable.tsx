import { useState } from 'react';

import Modal from '../../components/Modal.tsx';
import Table from '../../components/Table.tsx';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import { useModal } from '../../utils/useModal.ts';
import { FsTag } from './fs-utils.tsx';
import { useFs } from './useFs.ts';

const TagsTable = () => {
  const [selectedItem, setSelectedItem] = useState<FsTag>();
  const { tags } = useFs();
  const { translate } = useLanguageContext();
  const modal = useModal();

  const onCloseModal = () => {
    setSelectedItem(undefined);
    modal.closeModal();
  };
  if (tags === null || tags === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Table
        headers={[
          translate('fs.table-header.id'),
          translate('fs.table-header.title'),
        ]}
        tableBody={
          <tbody>
            {tags.map((tag) => (
              <tr
                key={tag.id}
                role={'button'}
                onClick={() => {
                  setSelectedItem(tag);
                  modal.openModal();
                }}
              >
                <td>{tag.id}</td>
                <td>{tag.title}</td>
              </tr>
            ))}
          </tbody>
        }
      />
      {selectedItem && (
        <Modal isOpen={modal.isOpen} onClose={onCloseModal}>
          <h1>
            {selectedItem.id}. {selectedItem.title}
          </h1>
        </Modal>
      )}
    </>
  );
};

export default TagsTable;
