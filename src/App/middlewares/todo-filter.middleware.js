import * as types from '../actions/action-types';
import {store} from '../store/store';//eslint-disable-line
import {push} from 'react-router-redux';

const categoryUrlRegexp = /category\/([^\/]+)/;

export const todoFilterMiddleware = store => next => action => {

  if (action.type === types.UPDATE_TODO_FILTER) {
    let storeState = store.getState();
    let {locationBeforeTransitions} = storeState.routing;
    let pathnameInStore = locationBeforeTransitions && locationBeforeTransitions.pathname;
    let categoryUrlGroups = categoryUrlRegexp.exec(pathnameInStore);
    let categoryPath = categoryUrlGroups ? categoryUrlGroups[0] : '';
    let {searchQuery, showDone} = Object.assign({}, storeState.todoFilterState.present, action.todoFilterState);

    store.dispatch(
      push(`/${categoryPath}${ searchQuery ? '/searchQuery/' + searchQuery : ''}${showDone ? '/showDone/true' : ''}`)
    );
  }

  next(action);
};
