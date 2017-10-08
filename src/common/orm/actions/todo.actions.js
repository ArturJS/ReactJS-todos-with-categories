import shortid from 'shortid'; // todo use server api
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO
} from './action-types';


export const addTodo = (todo, categoryId) => {
  return {
    type: ADD_TODO,
    payload: {
      todo: {
        id: shortid.generate(),
        isDone: false,
        categoryId,
        ...todo
      }
    }
  };
};

export const removeTodo = (todoId) => {
  return {
    type: REMOVE_TODO,
    payload: {
      todoId
    }
  };
};

export const updateTodo = (updatedTodo) => {
  return {
    type: UPDATE_TODO,
    payload: {
      todo: updatedTodo
    }
  };
};
