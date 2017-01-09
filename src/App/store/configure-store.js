import rootReducer from '../reducers';
import {createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import {hashHistory} from 'react-router';

const middleware = routerMiddleware(hashHistory);

export default (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(middleware));
};
