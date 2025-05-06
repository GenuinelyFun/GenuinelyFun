import { useState } from 'react';

import Modal from '../../components/Modal.tsx';
import Table from '../../components/Table.tsx';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import { useModal } from '../../utils/useModal.ts';
import { FsProduct } from './fs-utils.tsx';
import { useFs } from './useFs.ts';

const ProductsTable = () => {
  const [product, setProduct] = useState<FsProduct>();
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
      <Table
        headers={[
          translate('fs.table-header.id'),
          translate('fs.table-header.title'),
          translate('fs.table-header.description'),
          translate('fs.table-header.image'),
        ]}
        tableBody={
          <tbody>
            {products.map((product) => (
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
                {product.image && <td>{product.image}</td>}
              </tr>
            ))}
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
