import { useState } from 'react';

import CheckmarkIcon from '../../assets/icons/CheckmarkIcon.tsx';
import CrossSolidIcon from '../../assets/icons/CrossSolidIcon.tsx';
import PencilInBox from '../../assets/icons/PencilInBox.tsx';
import GenericButton from '../../components/GenericButton.tsx';
import Modal from '../../components/Modal.tsx';
import Table from '../../components/Table.tsx';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import { useModal } from '../../utils/useModal.ts';
import styles from './FireAndSecurity.module.less';
import { FsProduct } from './fs-utils.tsx';
import { useFs } from './useFs.ts';

const ProductsTable = () => {
  const [product, setProduct] = useState<FsProduct>();
  const [editMode, setEditMode] = useState<string>();
  const { products } = useFs();
  const { translate } = useLanguageContext();
  const modal = useModal();

  const onCloseModal = () => {
    setProduct(undefined);
    modal.closeModal();
  };

  if (products === null || products === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <GenericButton onClick={() => setEditMode('new')}>
        Add a new product
      </GenericButton>
      <Table
        headers={[
          translate('fs.table-header.id'),
          translate('fs.table-header.title'),
          translate('fs.table-header.description'),
          translate('fs.table-header.image'),
          translate('fs.table-header.actions'),
        ]}
        tableBody={
          <tbody>
            {editMode === 'new' && (
              <tr className={styles.tableForm}>
                <td></td>
                <td>
                  <input />
                </td>
                <td>
                  <textarea rows={3} />
                </td>
                <td>
                  <input />
                </td>
                <td className={styles.actions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => setEditMode(undefined)}
                  >
                    <CheckmarkIcon className={styles.actionButton} />
                  </button>
                  <button
                    className={styles.actionButton}
                    onClick={() => setEditMode(undefined)}
                  >
                    <CrossSolidIcon className={styles.actionButton} />
                  </button>
                </td>
              </tr>
            )}
            {products.map((product) => {
              if (editMode === product.id.toString()) {
                return (
                  <tr key={product.id} className={styles.tableForm}>
                    <td>{product.id}</td>
                    <td>
                      <input defaultValue={product.title} />
                    </td>
                    <td>
                      <textarea rows={3} defaultValue={product.description} />
                    </td>
                    <td>
                      <input defaultValue={product.image} />
                    </td>
                    <td className={styles.actions}>
                      <button
                        className={styles.actionButton}
                        onClick={() => setEditMode(undefined)}
                      >
                        <CheckmarkIcon className={styles.actionButton} />
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => setEditMode(undefined)}
                      >
                        <CrossSolidIcon className={styles.actionButton} />
                      </button>
                    </td>
                  </tr>
                );
              }
              return (
                <tr
                  key={product.id}
                  role={'button'}
                  onClick={() => {
                    setProduct(product);
                    modal.openModal();
                  }}
                >
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>
                    {product.image && (
                      <img src={product.image} alt={product.title} />
                    )}
                  </td>
                  <td>
                    <button
                      className={styles.actionButton}
                      aria-label={translate('fs.edit') + ' ' + product.title}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEditMode(product.id);
                      }}
                    >
                      <PencilInBox />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        }
      />
      {product && (
        <Modal isOpen={modal.isOpen} onClose={onCloseModal}>
          <h1>
            {product.id}. {product.title}
          </h1>
          <p>{product.description}</p>
          {product.image}
        </Modal>
      )}
    </>
  );
};

export default ProductsTable;
