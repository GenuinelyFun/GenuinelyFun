import { useCallback, useEffect, useState } from 'react';

import Modal from '../../components/Modal.tsx';
import Table from '../../components/Table.tsx';
import { useLanguageContext } from '../../utils/i18n/language-utils.ts';
import { useModal } from '../../utils/useModal.ts';
import styles from './FireAndSecurity.module.less';
import { FsItem } from './fs-utils.tsx';
import Pill from './Pill.tsx';
import { useFs } from './useFs.ts';

const EverythingTable = () => {
  const [item, setItem] = useState<FsItem>();
  const [filterText, setFilterText] = useState<string>();
  const [filterCategory, setFilterCategory] = useState<string>();
  const [filterTag, setFilterTag] = useState<string>();
  const [filteredItems, setFilteredItems] = useState<FsItem[]>();
  const [filterImage, setFilterImage] = useState<boolean>(false);
  const { items, categories, tags } = useFs();
  const { translate } = useLanguageContext();
  const modal = useModal();

  useEffect(() => {
    if (items !== undefined && filteredItems === undefined) {
      setFilteredItems(items);
    }
  }, [items]);

  const isTextIncludeSearchText = (text: string): boolean => {
    if (filterText !== undefined && filterText !== '') {
      return text.toLowerCase().includes(filterText);
    } else {
      return true;
    }
  };

  useEffect(() => {
    let filtering = items;
    if (filterText !== undefined && filterText !== '') {
      filtering = filtering?.filter(
        (item) =>
          isTextIncludeSearchText(item.title) ||
          isTextIncludeSearchText(item.description) ||
          item.tags.some((tag) => isTextIncludeSearchText(tag.title)) ||
          item.tags.some(
            (tag) => tag.category && isTextIncludeSearchText(tag.category.title)
          )
      );
    }
    if (filterCategory !== 'all' && filterCategory !== undefined) {
      filtering = filtering?.filter((item) =>
        item.tags.some((tag) => tag.category?.id === Number(filterCategory))
      );
    }
    if (filterTag !== 'all' && filterTag !== undefined) {
      filtering = filtering?.filter((item) =>
        item.tags.some((tag) => tag.id === Number(filterTag))
      );
    }
    if (filterImage) {
      filtering = filtering?.filter((item) => item.image !== undefined);
    }
    setFilteredItems(filtering);
  }, [filterText, filterCategory, filterTag, filterImage]);

  const onCloseModal = useCallback(() => {
    setItem(undefined);
    modal.closeModal();
  }, [modal]);

  if (items === null || items === undefined || filteredItems === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className={styles.filters}>
        <label>
          {translate('fs.search')}:
          <input
            type={'text'}
            onChange={(e) => {
              setFilterText(e.target.value.toLowerCase().trim());
            }}
          />
        </label>
        <label>
          {translate('fs.categories')}:
          <select onChange={(e) => setFilterCategory(e.target.value)}>
            <option defaultChecked={true} value={'all'}>
              {translate('select-all')}
            </option>
            {categories
              ?.sort((a, b) => a.title.localeCompare(b.title))
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
          </select>
        </label>
        <label>
          {translate('fs.tags')}:
          <select onChange={(e) => setFilterTag(e.target.value)}>
            <option defaultChecked={true} value={'all'}>
              {translate('select-all')}
            </option>
            {tags
              ?.sort((a, b) => a.title.localeCompare(b.title))
              .map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.title}
                </option>
              ))}
          </select>
        </label>
        <label>
          {translate('fs.table-header.image')}:
          <input
            type={'checkbox'}
            onChange={(e) => setFilterImage(e.target.checked)}
          />
        </label>
      </form>
      {filteredItems.length > 0 ? (
        <Table
          headers={[
            translate('fs.table-header.id'),
            translate('fs.tags'),
            translate('fs.table-header.title'),
            translate('fs.table-header.description'),
            translate('fs.table-header.image'),
          ]}
          tableBody={
            <tbody>
              {filteredItems.map((it) => (
                <tr
                  key={it.productId}
                  role={'button'}
                  onClick={() => {
                    setItem(it);
                    modal.openModal();
                  }}
                >
                  <td>{it.productId}</td>
                  <td>
                    {it.tags.map((tag) => (
                      <Pill
                        key={tag.id}
                        status={`${tag.title}, ${tag.category?.title}`}
                        style={{
                          backgroundColor: tag.category?.backgroundColor,
                          color: tag.category?.fontColor,
                        }}
                      />
                    ))}
                  </td>
                  <td>{it.title}</td>
                  <td>{it.description}</td>
                  <td>{it.image}</td>
                </tr>
              ))}
            </tbody>
          }
        />
      ) : (
        <p>{translate('fs.empty-table')}</p>
      )}
      {item && (
        <Modal isOpen={modal.isOpen} onClose={onCloseModal}>
          <h1>
            {item.productId}. {item.title}
          </h1>
          <p>{item.description}</p>
          <h2>Tags</h2>
          <ul className={styles.tags}>
            {item.tags.map((tag) => (
              <li key={tag.id}>
                <Pill
                  status={`${tag.title}, ${tag.category?.title}`}
                  style={{
                    backgroundColor: tag.category?.backgroundColor,
                    color: tag.category?.fontColor,
                  }}
                />
              </li>
            ))}
          </ul>
          {item.image}
        </Modal>
      )}
    </>
  );
};

export default EverythingTable;
