import shortid from 'shortid'; // todo use server api
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
  TOGGLE_EXPAND_CATEGORY
} from './action-types';

export const removeCategory = (categoryId) => {
  return {
    type: REMOVE_CATEGORY,
    payload: {
      categoryId
    }
  };
};

export const addCategory = (category) => {
  return {
    type: ADD_CATEGORY,
    payload: {
      category: {
        id: shortid.generate(),
        childs: [],
        parentId: null,
        isExpanded: false,
        ...category
      }
    }
  };
};

export const updateCategory = (category) => {
  return {
    type: UPDATE_CATEGORY,
    payload: {
      category
    }
  };
};

export const toggleExpandCategory = (categoryId, isExpanded) => {
  return {
    type: TOGGLE_EXPAND_CATEGORY,
    payload: {
      categoryId,
      isExpanded
    }
  }
};
