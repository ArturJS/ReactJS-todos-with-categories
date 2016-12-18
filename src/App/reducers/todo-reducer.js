import * as types from '../actions/action-types';

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return [...state, Object.assign({}, action.todo)];
    case types.REMOVE_TODO:
      let todoId = action.todo.id;
      return state.filter(item => item.id !== todoId);
    default:
      return state;
  }
};
