import * as types from '../actions/action-types';

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return [...state, Object.assign({}, action.todo)];
    default:
      return state;
  }
};
