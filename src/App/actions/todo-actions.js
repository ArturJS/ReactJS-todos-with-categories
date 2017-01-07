import * as types from './action-types';

export const addTodo = (todo) => {
  return {
    type: types.ADD_TODO,
    todo: Object.assign({}, todo, {isDone: false})
  };
};

export const removeTodo = (todo) => {
  return {
    type: types.REMOVE_TODO,
    todo: todo
  };
};

export const updateTodo = (todo, newTodoData) => {
  return {
    type: types.UPDATE_TODO,
    todo: Object.assign({}, todo, newTodoData)
  };
};
