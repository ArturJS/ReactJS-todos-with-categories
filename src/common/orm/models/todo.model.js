import {attr, Model} from 'redux-orm';
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO
} from '../actions/action-types';

export default class Todo extends Model {
  static modelName = 'Todo';
  static fields = {
    id: attr(),
    title: attr(),
    isDone: attr(),
    description: attr(),
    categoryId: attr()
  };

  static reducer(action, Todo, session) {
    const {type, payload} = action;

    switch (type) {
      case ADD_TODO: {
        Todo.create(payload.todo);
        break;
      }
      case REMOVE_TODO: {
        Todo.withId(payload.todoId).delete();
        break;
      }
      case UPDATE_TODO: {
        const {todo} = payload;
        Todo.withId(todo.id).update(todo);
        break;
      }
      default: break;
    }
  };
}

