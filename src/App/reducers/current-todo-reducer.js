import * as types from '../actions/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_CURRENT_TODO: {
      return {...state, ...action.payload};
    }
    default:
      return state;
  }
};
