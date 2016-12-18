import {combineReducers} from 'redux';
import undoable from 'redux-undo';
import todoList from './todo-reducer.js';

const rootReducer = combineReducers({
  todoList: undoable(todoList)
});

export default rootReducer;
