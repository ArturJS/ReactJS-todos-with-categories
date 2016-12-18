import * as types from './action-types';

export const addTodo = (todo) => {
  return {
    type: types.ADD_TODO,
    todo: todo
  };
};

export const removeTodo = (todo) => {
  return {
    type: types.REMOVE_TODO,
    todo: todo
  };
};
