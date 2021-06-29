import {
  FETCH_ACTION_SUCCESS,
  ADD_ACTION_SUCCESS,
  DELETE_ACTION_SUCCESS,
} from '../../actions/actionTypes';

export const action = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ACTION_SUCCESS:
      return {
        ...state,
        actions: action.payload,
      };
    case ADD_ACTION_SUCCESS:
      return {
        ...state,
        actions: action.payload,
      };
    case DELETE_ACTION_SUCCESS:
      delete state.actions[action.payload.id];
      return state;
    default:
      return state;
  }
};
