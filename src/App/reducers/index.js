import {combineReducers} from 'redux';
import undoable from 'redux-undo';
import {routerReducer} from 'react-router-redux';
import todoList from './todo-reducer.js';
import todoFilterState from './todo-filter-reducer.js';
import currentTodo from './current-todo-reducer.js';
import categoryList from './category-list-reducer.js';

const rootReducer = combineReducers({
  todoList: undoable(todoList),
  todoFilterState: undoable(todoFilterState),
  routing: routerReducer,
  currentTodo: currentTodo,
  categoryList: undoable(categoryList)
});

export default rootReducer;
