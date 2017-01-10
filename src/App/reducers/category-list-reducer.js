import * as types from '../actions/action-types';

export default (state = [], action) => {
  switch (action.type) {
    case types.UPDATE_CATEGORY_LIST:
      return JSON.parse(JSON.stringify(action.categoryList));
    default:
      return state;
  }
};
