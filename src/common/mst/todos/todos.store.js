import {extendObservable} from 'mobx';
import {types} from 'mobx-state-tree';

import {TodoModel} from './todo.model';


const TodosStore = types.model('TodosStore', {
  todos: types.array(TodoModel)
})
  .views(self => ({
    getTodosByCategoryId: (id) => {
      return self.todos.filter(todo => todo.category.id === id);
    }
  }))
  .actions(self => ({
    addTodo: (todo) => {
      self.todos.push(todo);
    },

    removeTodo: (id) => {
      self.todos.filter(todo => todo.id !== id);
    },

    updateTodo: ({id, ...todo}) => {
      const relatedTodo = self.todos.find(todo => todo.id === id);
      extendObservable(relatedTodo, todo);
    }
  }));

export const todosStore = TodoModel.create({todos: []});
