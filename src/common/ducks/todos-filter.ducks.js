const UPDATE_TODO_FILTER = 'reactjs-learning/TodosFilter/UPDATE_TODO_FILTER';

const initialState = {
  showDone: false,
  searchQuery: ''
};

export default (state = initialState, action) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case UPDATE_TODO_FILTER:
      return {...state, ...payload.todosFilterState};
    default:
      return state;
  }
};

export const updateTodosFilter = (todosFilterState) => {
  if (todosFilterState.searchQuery) {
    todosFilterState.searchQuery = todosFilterState.searchQuery.trim().toLowerCase();
  }

  return {
    type: UPDATE_TODO_FILTER,
    payload: {
      todosFilterState
    }
  };
};
