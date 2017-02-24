import TodoReducer from './todo-reducer';
import {addTodo, removeTodo, updateTodo} from '../actions/todo-actions';
import {removeCategoryTodos} from '../actions/category-actions';
import shortid from 'shortid';
import _ from 'lodash';

describe('TodoReducer test', ()=> {
  it('should handle ADD_TODO action', ()=> {
    let categoryId = shortid.generate();
    let todoList = TodoReducer([], addTodo({title: 'test', description: 'test123'}, categoryId));
    let firstTodo = todoList[0];

    expect(_.isString(firstTodo.id)).toBeTruthy();

    delete firstTodo.id;

    expect(todoList)
      .toEqual([{
        title: 'test',
        description: 'test123',
        isDone: false,
        categoryId: categoryId
      }]);
  });

  it('should handle REMOVE_TODO action', ()=> {
    let firstTodoId = shortid.generate();
    let secondTodoId = shortid.generate();
    let categoryId = shortid.generate();

    const initialTodoList = [
      {
        id: firstTodoId,
        title: '1',
        description: '12',
        isDone: true,
        categoryId: categoryId
      },
      {
        id: secondTodoId,
        title: '2',
        description: '23',
        isDone: false,
        categoryId: categoryId
      },
    ];

    let todoList = TodoReducer(initialTodoList, removeTodo(initialTodoList[1]));

    expect(todoList)
      .toEqual([
        initialTodoList[0]
      ]);
  });

  it('should handle UPDATE_TODO action', ()=> {
    let firstTodoId = shortid.generate();
    let secondTodoId = shortid.generate();
    let categoryId1 = shortid.generate();
    let categoryId2 = shortid.generate();

    const initialTodoList = [
      {
        id: firstTodoId,
        title: '1',
        description: '12',
        isDone: true,
        categoryId: categoryId1
      },
      {
        id: secondTodoId,
        title: '2',
        description: '23',
        isDone: false,
        categoryId: categoryId1
      },
    ];

    const newTodoData = {
      id: secondTodoId,
      title: 'qwe',
      description: 'qwe',
      isDone: true,
      categoryId: categoryId2
    };

    let todoList = TodoReducer(initialTodoList, updateTodo(initialTodoList[1], newTodoData));

    expect(todoList)
      .toEqual([
        initialTodoList[0],
        newTodoData
      ]);
  });

  it('should handle REMOVE_CATEGORY_TODOS action', ()=> {
    let categoryId1 = shortid.generate();
    let categoryChildId1 = shortid.generate();
    let categoryChildId2 = shortid.generate();

    const categoryList = [
      {
        id: categoryId1,
        name: 'p',
        parentId: null,
        childs: [
          {
            id: categoryChildId1,
            name: 'c1',
            parentId: categoryId1,
            childs: []
          },
          {
            id: categoryChildId2,
            name: 'c2',
            parentId: categoryId1,
            childs: []
          }
        ]
      }
    ];

    const initialTodoList = [
      {
        id: shortid.generate(),
        title: '1',
        description: '12',
        isDone: true,
        categoryId: shortid.generate()
      },
      {
        id: shortid.generate(),
        title: '2',
        description: '23',
        isDone: false,
        categoryId: categoryId1
      },
      {
        id: shortid.generate(),
        title: '2',
        description: '23',
        isDone: false,
        categoryId: categoryChildId1
      },
      {
        id: shortid.generate(),
        title: '2',
        description: '23',
        isDone: false,
        categoryId: categoryChildId2
      },
    ];

    let todoList = TodoReducer(initialTodoList, removeCategoryTodos(categoryList[0]));

    expect(todoList)
      .toEqual([
        initialTodoList[0]
      ]);
  });
});
