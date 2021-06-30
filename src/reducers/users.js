import { FETCH_USERS_SUCCESS } from '../actions/actionTypes';

export const users = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
