import shortid from 'shortid';
import * as types from './action-types';

export const updateCategoryList = (categoryList) => {
  return {
    type: types.UPDATE_CATEGORY_LIST,
    categoryList: JSON.parse(JSON.stringify(categoryList))
  };
};

export const removeCategory = (category) => {
  return {
    type: types.REMOVE_CATEGORY,
    category
  };
};

export const removeCategoryTodos = (category) => {
  return {
    type: types.REMOVE_CATEGORY_TODOS,
    category
  };
};

export const addCategory = (category) => {
  return {
    type: types.ADD_CATEGORY,
    category: Object.assign({}, category, {id: shortid.generate(), parentId: null, childs: []})//todo: swap default object with category
  };
};

export const addSubCategory = (relatedCategoryId) => {
  return {
    type: types.ADD_SUBCATEGORY,
    subcategory: {id: shortid.generate(), name: '', parentId: relatedCategoryId, childs: []},
    relatedCategoryId
  };
};
