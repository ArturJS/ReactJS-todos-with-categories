import {store} from '../store/store';
import _ from 'lodash';
import * as types from '../actions/action-types';

const todoEditUrlRegexp = /category\/([^\/]+)\/todo\/([^\/]+)/;

export default (state = {}, action) => {

  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      let {pathname} = action.payload;

      if (!todoEditUrlRegexp.test(pathname)) return state;

      let todoList = store.getState().todoList.present;
      let todoId = todoEditUrlRegexp.exec(pathname)[2];

      let relatedTodo = _.find(todoList, (todo)=> todo.id === todoId);
      return Object.assign({}, relatedTodo || {});
    }
    case types.UPDATE_CURRENT_TODO: {
      return {...state, ...action.payload};
    }
    default:
      return state;
  }
};
