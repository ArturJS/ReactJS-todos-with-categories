import {combineReducers} from 'redux';
import undoable from 'redux-undo';
import todoList from './todo-reducer.js';
import todoFilterState from './todo-filter-reducer.js';


const rootReducer = combineReducers({
  todoList: undoable(todoList),
  todoFilterState: undoable(todoFilterState)
});

export default rootReducer;
