import { ReactNode } from 'react';

import { buildURL } from '../../utils/fetch.ts';
import categoryMock from './mocks/FsCategoriesMock.json';
import productsMock from './mocks/FsProductsMock.json';
import relationProductsTagsMock from './mocks/FsRelationProductsTagsMock.json';
import relationTagsCategoriesMock from './mocks/FsRelationTagsCategoriesMock.json';
import tagsMock from './mocks/FsTagsMock.json';

export interface FsItem {
  productId: number;
  title: string;
  description: string;
  image?: ReactNode;
  tags: ({
    category?: FsCategory;
  } & FsTag)[];
}

export interface FsProduct {
  id: number;
  title: string;
  description: string;
  image?: ReactNode;
}

export interface FsTag {
  id: number;
  title: string;
}

export interface FsCategory {
  title: string;
  id: number;
  backgroundColor: string;
  fontColor: string;
}

export interface FsRelationTagsCategories {
  id: number;
  tagId: number;
  categoryId: number;
}

export interface FsRelationProductsTags {
  id: number;
  productId: number;
  tagId: number;
}

export enum FsPaths {
  PRODUCTS = 'products',
  TAGS = 'tags',
  CATEGORIES = 'categories',
  RELATIONS_TAGS_CATEGORIES = 'relation-products-tags',
  RELATIONS_PRODUCTS_TAGS = 'relation-tags-categories',
}

const mapToFsProduct = (product: Record<string, string>): FsProduct => ({
  id: Number(product.id),
  title: product.title,
  description: product.description,
  image: product.image ? (
    <img src={product.image} alt={product.title} />
  ) : undefined,
});

const mapToFsTag = (tag: Record<string, string>): FsTag => ({
  id: Number(tag.id),
  title: tag.title,
});

const mapToFsCategory = (category: Record<string, string>): FsCategory => ({
  id: Number(category.id),
  title: category.title,
  backgroundColor: category.background_color,
  fontColor: category.font_color,
});

const mapToFsRelationProductsTags = (
  relation: Record<string, string>
): FsRelationProductsTags => ({
  id: Number(relation.id),
  productId: Number(relation.product_id),
  tagId: Number(relation.tag_id),
});

const mapToFsRelationTagsCategories = (
  relation: Record<string, string>
): FsRelationTagsCategories => ({
  id: Number(relation.id),
  categoryId: Number(relation.category_id),
  tagId: Number(relation.tag_id),
});

const createUrl = (get: string) => {
  return `https://genuinelyfun.com/backend/fs/api/${get}.php`;
};

export const getAllProducts = async (): Promise<FsProduct[]> => {
  if (window.location.origin.includes('localhost')) {
    return new Promise((resolve) => resolve(productsMock.map(mapToFsProduct)));
  }
  return fetch(createUrl(FsPaths.PRODUCTS), {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data.map(mapToFsProduct));
};

export const getAllTags = async (): Promise<FsTag[]> => {
  if (window.location.origin.includes('localhost')) {
    return new Promise((resolve) => resolve(tagsMock.map(mapToFsTag)));
  }
  return fetch(createUrl(FsPaths.TAGS), {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data.map(mapToFsTag));
};

export const getAllCategories = async (): Promise<FsCategory[]> => {
  if (window.location.origin.includes('localhost')) {
    return new Promise((resolve) => resolve(categoryMock.map(mapToFsCategory)));
  }
  return fetch(createUrl(FsPaths.CATEGORIES), {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data.map(mapToFsCategory));
};

export const getAllRelationProductsTags = async (): Promise<
  FsRelationProductsTags[]
> => {
  if (window.location.origin.includes('localhost')) {
    return new Promise((resolve) =>
      resolve(relationProductsTagsMock.map(mapToFsRelationProductsTags))
    );
  }
  return fetch(createUrl(FsPaths.RELATIONS_PRODUCTS_TAGS), {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data.map(mapToFsRelationProductsTags));
};

export const getAllRelationTagsCategories = async (): Promise<
  FsRelationTagsCategories[]
> => {
  if (window.location.origin.includes('localhost')) {
    return new Promise((resolve) =>
      resolve(relationTagsCategoriesMock.map(mapToFsRelationTagsCategories))
    );
  }
  return fetch(createUrl(FsPaths.RELATIONS_TAGS_CATEGORIES), {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => data.map(mapToFsRelationTagsCategories));
};

export const getProductById = async (
  id: number
): Promise<FsProduct | undefined> => {
  if (window.location.origin.includes('localhost')) {
    return productsMock
      .map(mapToFsProduct)
      .find((product) => product.id === id);
  }
  fetch(buildURL(createUrl(FsPaths.PRODUCTS), { id: id }), {
    method: 'GET',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => data.map(mapToFsProduct))
    .catch((err) => {
      return err.message;
    });
};

export const getTagById = async (id: number): Promise<FsTag | undefined> => {
  if (window.location.origin.includes('localhost')) {
    return tagsMock.map(mapToFsTag).find((tag) => tag.id === id);
  }
  fetch(buildURL(createUrl(FsPaths.TAGS), { id: id }), {
    method: 'GET',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => data.map(mapToFsTag))
    .catch((err) => {
      return err.message;
    });
};

export const getCategoryById = async (
  id: number
): Promise<FsCategory | undefined> => {
  if (window.location.origin.includes('localhost')) {
    return categoryMock
      .map(mapToFsCategory)
      .find((category) => category.id === id);
  }
  fetch(buildURL(createUrl(FsPaths.CATEGORIES), { id: id }), {
    method: 'GET',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => data.map(mapToFsCategory))
    .catch((err) => {
      return err.message;
    });
};

export const getAllTagsRelationsForProductId = async (
  id: number
): Promise<FsRelationProductsTags[] | undefined> => {
  if (window.location.origin.includes('localhost')) {
    return relationProductsTagsMock
      .map(mapToFsRelationProductsTags)
      .filter((item) => item.productId === id);
  }
  fetch(
    buildURL(createUrl(FsPaths.RELATIONS_PRODUCTS_TAGS), {
      product_id: id,
    }),
    {
      method: 'GET',
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => data.map(mapToFsRelationProductsTags))
    .catch((err) => {
      return err.message;
    });
};

export const getAllProductsRelationsForTagId = async (
  id: number
): Promise<FsRelationProductsTags[] | undefined> => {
  if (window.location.origin.includes('localhost')) {
    return relationProductsTagsMock
      .map(mapToFsRelationProductsTags)
      .filter((item) => item.tagId === id);
  }
  fetch(buildURL(createUrl(FsPaths.RELATIONS_PRODUCTS_TAGS), { tag_id: id }), {
    method: 'GET',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => data.map(mapToFsRelationProductsTags))
    .catch((err) => {
      return err.message;
    });
};

export const getAllCategoriesRelationsForTagId = async (
  id: number
): Promise<FsRelationTagsCategories[] | undefined> => {
  if (window.location.origin.includes('localhost')) {
    return relationTagsCategoriesMock
      .map(mapToFsRelationTagsCategories)
      .filter((item) => item.tagId === id);
  }
  fetch(
    buildURL(createUrl(FsPaths.RELATIONS_TAGS_CATEGORIES), { tag_id: id }),
    {
      method: 'GET',
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => data.map(mapToFsRelationTagsCategories))
    .catch((err) => {
      return err.message;
    });
};

export const getAllTagsRelationsForCategoryId = async (
  id: number
): Promise<FsRelationTagsCategories[] | undefined> => {
  if (window.location.origin.includes('localhost')) {
    return relationTagsCategoriesMock
      .map(mapToFsRelationTagsCategories)
      .filter((item) => item.categoryId === id);
  }
  fetch(
    buildURL(createUrl(FsPaths.RELATIONS_TAGS_CATEGORIES), {
      category_id: id,
    }),
    {
      method: 'GET',
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => data.map(mapToFsRelationTagsCategories))
    .catch((err) => {
      return err.message;
    });
};
