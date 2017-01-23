import {createSelector} from 'reselect';

const urlCategoryIdRegexp = /category\/([^\/]+)/;

const getAllTodos = (state) => state.todoList.present;

const getSelectedCategoryId = (state) => {
  const {pathname} = state.routing.locationBeforeTransitions;
  const groups = urlCategoryIdRegexp.exec(pathname);

  if (!groups) return null;

  return groups[1];
};

const getTodoFilterState = (state) => {
  return state.todoFilterState.present;
};

const getTodoList = createSelector(
  [getAllTodos, getSelectedCategoryId, getTodoFilterState],
  (allTodos, categoryId, todoFilterState) => {
    let {showDone, searchQuery} = todoFilterState;

    let todoList = allTodos.filter(todo => todo.categoryId === categoryId);

    if (showDone) {
      todoList = todoList.filter((todo)=> todo.isDone);
    }

    if (searchQuery && searchQuery.trim()) {
      searchQuery = searchQuery.toLowerCase();

      todoList = todoList.filter((todo)=> {
        return todo.title.toLowerCase().indexOf(searchQuery) > -1 ||
          todo.description.toLowerCase().indexOf(searchQuery) > -1;
      });
    }

    return todoList;
  }
);

export default getTodoList;
