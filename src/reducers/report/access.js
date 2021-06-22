import {
  FETCH_ACCESS_TABLE_SUCCESS,
  CLEAR_ACCESS_TABLE,
} from '../../actions/actionTypes';

export const access = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ACCESS_TABLE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case CLEAR_ACCESS_TABLE:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};
