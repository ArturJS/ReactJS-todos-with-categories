import * as types from '../actions/action-types';

export default (state = {showDone: false, searchQuery: ''}, action) => {
  switch (action.type) {
    case types.UPDATE_TODO_FILTER:
      return Object.assign({}, state, action.todoFilterState);
    default:
      return state;
  }
};
