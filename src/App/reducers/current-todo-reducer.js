import {store} from '../store/store';
import _ from 'lodash';

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
    default:
      return state;
  }
};
