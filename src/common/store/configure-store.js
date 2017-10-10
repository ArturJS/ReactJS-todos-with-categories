import {createStore, applyMiddleware, combineReducers} from 'redux';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import {createReducer} from 'redux-orm';

import orm from '../orm';
import history from '../history';
import todosFilterReducer from '../ducks/todos-filter.ducks';
import editingTodoReducer from '../ducks/editing-todo.ducks';
import modalStackReducer from '../features/modals/modal.ducks';

const middleware = routerMiddleware(history);
const ormReducer = createReducer(orm);

export default (initialState) => {
  return createStore(
    combineReducers({
      router: routerReducer,
      orm: ormReducer,
      todosFilter: todosFilterReducer,
      editingTodo: editingTodoReducer,
      modalStack: modalStackReducer
    }),
    initialState,
    applyMiddleware(middleware)
  );
};
