import * as types from '../actions/action-types';
import {store} from '../store/store';//eslint-disable-line
import {push} from 'react-router-redux';

const categoryUrlRegexp = /category\/([^\/]+)/;

export const todoFilterMiddleware = store => next => action => {
  if (action.type === types.UPDATE_TODO_FILTER) {
    let {pathname} = store.getState().routing.locationBeforeTransitions;
    let categoryUrlGroups = categoryUrlRegexp.exec(pathname);
    let categoryPath = categoryUrlGroups ? categoryUrlGroups[0] : '';
    let {searchQuery, showDone} = action.todoFilterState;

    store.dispatch(
      push(`${categoryPath}${ searchQuery ? '/searchQuery/' + searchQuery : ''}${showDone ? '/showDone/true' : ''}`)
    );
    console.dir(pathname);
  }

  next(action);
};
