import {addTodo, removeTodo, updateTodo} from './todo-actions';
import * as types from './action-types';
import shortid from 'shortid';
import _ from 'lodash';

describe('TodoActions test', ()=> {
  it('addTodo should create ADD_TODO action', ()=> {
    let categoryId = shortid.generate();
    let todoData = {
      name: '123',
      description: '123qwe'
    };
    let addTodoAction = addTodo(todoData, categoryId);

    expect(_.isString(addTodoAction.todo.id)).toBeTruthy();
    expect(addTodoAction.type).toBe(types.ADD_TODO);

    delete addTodoAction.todo.id;

    expect(addTodoAction).toEqual({
      type: types.ADD_TODO,
      todo: Object.assign(todoData, {
        isDone: false,
        categoryId: categoryId
      })
    });
  });

  it('removeTodo should create REMOVE_TODO action', ()=> {
    let todoData = {
      name: '123',
      description: '123qwe'
    };
    let removeTodoAction = removeTodo(todoData);

    expect(removeTodoAction).toEqual({
      type: types.REMOVE_TODO,
      todo: todoData
    });
  });

  it('updateTodo should create UPDATE_TODO action', ()=> {
    let todo = {
      name: '123',
      description: '123qwe'
    };
    let newTodoData = {
      name: '321',
      description: '543'
    };
    let updateTodoAction = updateTodo(todo, newTodoData);

    expect(updateTodoAction).toEqual({
      type: types.UPDATE_TODO,
      todo: newTodoData
    });
  });
});
