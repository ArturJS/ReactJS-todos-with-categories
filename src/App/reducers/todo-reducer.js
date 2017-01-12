import * as types from '../actions/action-types';
import {getAllChildCategoryIds} from '../helpers/category.helpers';
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
    case types.REMOVE_CATEGORY_TODOS:
      let {category} = action;
      let allRelatedCategoryIds = [category.id, ...getAllChildCategoryIds(category)];

      return state.filter((todo)=> !_.includes(allRelatedCategoryIds, todo.categoryId));
    default:
      return state;
  }
};
