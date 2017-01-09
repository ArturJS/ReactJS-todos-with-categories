import {store} from '../store/store';
import * as _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE'://todo fix (import normal action type from react-router-redux)
      console.log('LOCATION_CHANGE');
      console.dir(action.payload);
      let todoList = store.getState().todoList.present;
      let todoId = +action.payload.pathname.substr(6);//todo fix (get normal params from current state)

      let relatedTodo = _.find(todoList, (todo)=> todo.id === todoId);
      return Object.assign({}, relatedTodo || {});
    default:
      return state;
  }
};
