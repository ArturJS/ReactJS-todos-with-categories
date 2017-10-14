import {createSelector} from 'redux-orm';
import orm from '../orm.schema';

export const todoIdsListByCategoryId = (categoryId) => createSelector(orm,
  state => state.orm.present,
  state => state.todosFilter,
  (session, todosFilter) => {
    const {showDone, searchQuery} = todosFilter;

    return session.Todo
      .filter(todo => todo.categoryId === categoryId)
      .filter(todo => {
        if (showDone) {
          return todo.isDone;
        }
        return true;
      })
      .filter(todo => {
        return todo.title.toLowerCase().indexOf(searchQuery) > -1;
      })
      .toRefArray()
      .map(todo => todo.id);
  }
);

export const todoById = (todoId) => createSelector(orm, state => state.orm.present, session => {
  if (!session.Todo.hasId(todoId)) return null;

  return session.Todo.withId(todoId).ref;
});

export const overallProgress = createSelector(orm, state => state.orm.present, session => {
  const allTodos = session.Todo.all().toRefArray();
  if (allTodos.length === 0) return 100;

  const isDoneTodos = allTodos.filter(todo => todo.isDone);
  return isDoneTodos.length / allTodos.length * 100;
});
