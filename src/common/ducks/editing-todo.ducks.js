const UPDATE_EDITING_TODO = 'reactjs-learning/EditingTodo/UPDATE_EDITING_TODO';

export default (state = {}, action) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case UPDATE_EDITING_TODO: {
      return {...state, ...payload.todo};
    }
    default:
      return state;
  }
};

export const updateEditingTodo = (updatedTodo) => {
  return {
    type: UPDATE_EDITING_TODO,
    payload: {
      todo: updatedTodo
    }
  };
};
