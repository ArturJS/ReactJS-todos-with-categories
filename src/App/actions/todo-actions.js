import * as types from './action-types';
import shortid from 'shortid';

export const addTodo = (todo, categoryId) => {
  return {
    type: types.ADD_TODO,
    todo: Object.assign({}, todo, {id: shortid.generate(), isDone: false, categoryId: categoryId})
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
