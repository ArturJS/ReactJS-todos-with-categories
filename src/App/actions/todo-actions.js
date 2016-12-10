import * as types from './action-types';

export const addTodo = (todo) => {
  return {
    type: types.ADD_TODO,
    todo: todo
  };
};
