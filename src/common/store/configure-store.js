import {createStore, applyMiddleware, combineReducers} from 'redux';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import {createReducer} from 'redux-orm';
import undoable, {excludeAction} from 'redux-undo';

import orm from '../orm';
import history from '../history';
import todosFilterReducer from '../ducks/todos-filter.ducks';
import editingTodoReducer from '../ducks/editing-todo.ducks';
import modalStackReducer from '../features/modals/modal.ducks';
import {TOGGLE_EXPAND_CATEGORY} from '../orm/actions/action-types';

const middleware = routerMiddleware(history);
const ormReducer = createReducer(orm);

export default (initialState) => {
  return createStore(
    combineReducers({
      router: routerReducer,
      orm: undoable(ormReducer, {filter: excludeAction(TOGGLE_EXPAND_CATEGORY)}),
      todosFilter: todosFilterReducer,
      editingTodo: editingTodoReducer,
      modalStack: modalStackReducer
    }),
    initialState,
    applyMiddleware(middleware)
  );
};
