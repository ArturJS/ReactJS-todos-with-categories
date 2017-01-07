import * as types from './action-types';

export const updateTodoFilter = (todoFilterState) => {
  return {
    type: types.UPDATE_TODO_FILTER,
    todoFilterState: Object.assign({}, todoFilterState)
  };
};
