import {
  FETCH_SYSTEM_SUCCESS,
  ADD_SYSTEM_SUCCESS,
  DELETE_SYSTEM_SUCCESS,
} from '../../actions/actionTypes';

export const system = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SYSTEM_SUCCESS:
      return {
        ...state,
        systems: action.payload,
      };
    case ADD_SYSTEM_SUCCESS:
      return {
        ...state,
        systems: action.payload,
      };
    case DELETE_SYSTEM_SUCCESS:
      delete state.systems[action.payload.id];
      return state;
    default:
      return state;
  }
};
