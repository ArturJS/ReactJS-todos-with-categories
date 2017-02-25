import * as types from '../actions/action-types';

export default (state = 'To-do list', action) => {
  switch (action.type) {
    case types.UPDATE_PAGE_TITLE:
      return action.payload;
    default:
      return state;
  }
};
