import * as types from '../actions/action-types';

export default (state = {showDone: true, searchQuery: ''}, action) => {
  switch (action.type) {
    case types.UPDATE_TODO_FILTER:
      return Object.assign({}, action.todoFilterState);
    default:
      return state;
  }
};
