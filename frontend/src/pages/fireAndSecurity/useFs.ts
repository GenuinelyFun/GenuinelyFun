import { useEffect, useState } from 'react';

import {
  FsCategory,
  FsItem,
  FsProduct,
  FsRelationProductsTags,
  FsRelationTagsCategories,
  FsTag,
  getAllCategories,
  getAllProducts,
  getAllRelationProductsTags,
  getAllRelationTagsCategories,
  getAllTags,
} from './fs-utils.tsx';

const mapAllToFsItem = (
  products: FsProduct[],
  tags: FsTag[],
  categories: FsCategory[],
  relationsProductsTags: FsRelationProductsTags[],
  relationsTagsCategories: FsRelationTagsCategories[]
): FsItem[] => {
  return products.map((product) => {
    return {
      productId: product.id,
      title: product.title,
      description: product.description,
      image: product.image,
      tags: getAllTagsByProductId(
        product.id,
        tags,
        categories,
        relationsProductsTags,
        relationsTagsCategories
      ),
    };
  });
};

const getAllTagsByProductId = (
  product: number,
  tags: FsTag[],
  categories: FsCategory[],
  relationsProductsTags: FsRelationProductsTags[],
  relationsTagsCategories: FsRelationTagsCategories[]
): ({
  category?: FsCategory;
} & FsTag)[] =>
  relationsProductsTags
    .filter((relation) => relation.productId === product)
    .map((relation) => tags.find((tag) => tag.id === relation.tagId))
    .filter((tag) => !!tag)
    .map((tag) => ({
      ...tag,
      category: getCategoryByTag(tag.id, categories, relationsTagsCategories),
    }));

const getCategoryByTag = (
  tag: number,
  categories: FsCategory[],
  relations: FsRelationTagsCategories[]
): FsCategory | undefined =>
  categories.find(
    (category) =>
      relations.find((relation) => relation.tagId === tag)?.categoryId ===
      category.id
  );

export const useFs = () => {
  const [items, setItems] = useState<FsItem[]>();
  const [products, setProducts] = useState<FsProduct[]>();
  const [tags, setTags] = useState<FsTag[]>();
  const [categories, setCategories] = useState<FsCategory[]>();
  const [relationTagsCategories, setRelationTagsCategories] =
    useState<FsRelationTagsCategories[]>();
  const [relationProductsTags, setRelationProductsTags] =
    useState<FsRelationProductsTags[]>();

  useEffect(() => {
    getAllProducts().then((r) => setProducts(r));
    getAllTags().then((r) => setTags(r));
    getAllCategories().then((r) => setCategories(r));
    getAllRelationProductsTags().then((r) => setRelationProductsTags(r));
    getAllRelationTagsCategories().then((r) => setRelationTagsCategories(r));
  }, []);

  useEffect(() => {
    if (
      products &&
      tags &&
      categories &&
      relationTagsCategories &&
      relationProductsTags
    ) {
      const items = mapAllToFsItem(
        products,
        tags,
        categories,
        relationProductsTags,
        relationTagsCategories
      );
      setItems(items);
    }
  }, [
    products,
    tags,
    categories,
    relationTagsCategories,
    relationProductsTags,
  ]);

  return {
    items,
    products,
    tags,
    categories,
    relationProductsTags,
    relationTagsCategories,
  };
};
