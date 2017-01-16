import {createSelector} from 'reselect';

const getAllTodos = (state) => state.todoList.present;
const getCompletedTodos = (state) => {
  return state.todoList.present.filter(todo => todo.isDone);
};

const getProgress = createSelector(
  [getAllTodos, getCompletedTodos],
  (allTodos, completedTodos) => {

    if (allTodos.length === 0) return 100;

    return completedTodos.length / allTodos.length * 100;
  }
);

export default getProgress;
