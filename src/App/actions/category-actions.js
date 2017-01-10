import * as types from './action-types';

export const updateCategoryList = (categoryList) => {
  return {
    type: types.UPDATE_CATEGORY_LIST,
    categoryList: JSON.parse(JSON.stringify(categoryList))
  };
};
