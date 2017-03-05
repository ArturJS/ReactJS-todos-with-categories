import * as types from './action-types';

export const updateCurrentTodo = (newCurrentTodo) => {
  return {
    type: types.UPDATE_CURRENT_TODO,
    payload: newCurrentTodo
  };
};
