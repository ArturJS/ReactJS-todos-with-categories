import rootReducer from '../reducers';
import {createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import {hashHistory} from 'react-router';
import {todoFilterMiddleware} from '../middlewares/todo-filter.middleware';

const middleware = routerMiddleware(hashHistory);

export default (initialState) => {//todo: you may add redux-dev-tools
  return createStore(rootReducer, initialState, applyMiddleware(middleware, todoFilterMiddleware));
};
