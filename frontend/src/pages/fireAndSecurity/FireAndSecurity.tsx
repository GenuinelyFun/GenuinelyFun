import { useState } from 'react';

import CategoriesTable from './CategoriesTable.tsx';
import EverythingTable from './EverythingTable.tsx';
import styles from './FireAndSecurity.module.less';
import ProductsTable from './ProductsTable.tsx';
import RelationProductsTags from './RelationProductsTags.tsx';
import RelationTagsCategories from './RelationTagsCategories.tsx';
import TagsTable from './TagsTable.tsx';

const FireAndSecurity = () => {
  const [showWhat, setShowWhat] = useState('everything');

  return (
    <main className={styles.container}>
      <h1>Fire &amp; Security Database</h1>
      <form onSubmit={(e) => e.preventDefault()} className={styles.filters}>
        <label>
          Select table to show:
          <select onChange={(e) => setShowWhat(e.target.value)}>
            <option value={'everything'}>Everything</option>
            <option value={'products'}>Products</option>
            <option value={'tags'}>Tags</option>
            <option value={'categories'}>Categories</option>
            <option value={'relationpt'}>Relation: Products and Tags</option>
            <option value={'relationtc'}>Relation: Tags and Categories</option>
          </select>
        </label>
      </form>
      {showWhat === 'everything' && <EverythingTable />}
      {showWhat === 'products' && <ProductsTable />}
      {showWhat === 'tags' && <TagsTable />}
      {showWhat === 'categories' && <CategoriesTable />}
      {showWhat === 'relationpt' && <RelationProductsTags />}
      {showWhat === 'relationtc' && <RelationTagsCategories />}
    </main>
  );
};

export default FireAndSecurity;
