import todoList from './todo-reducer.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  todoList
});

export default rootReducer;
