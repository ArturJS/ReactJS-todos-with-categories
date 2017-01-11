import * as types from '../actions/action-types';
import * as _ from 'lodash';

export default (state = [], action) => {
  let todoId;

  if (action.todo) {
    todoId = action.todo.id;
  }

  switch (action.type) {
    case types.ADD_TODO:
      return [Object.assign({}, action.todo), ...state];
    case types.REMOVE_TODO:
      return state.filter(item => item.id !== todoId);
    case types.UPDATE_TODO:
      let todoListCopy = state.slice();
      let todoIndex = _.findIndex(todoListCopy, (todo)=>todo.id === todoId);

      if (todoIndex > -1) {
        todoListCopy[todoIndex] = action.todo;
        return [...todoListCopy];
      } else {
        return state;
      }
    case types.REMOVE_CATEGORY:
      let categoryId = action.category.id;//todo use string type for all ids

      categoryId += '';

      return state.filter((todo)=> todo.categoryId !== categoryId);
    default:
      return state;
  }
};
