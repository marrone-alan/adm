import {
  FETCH_OPERATIONAL_TABLE_SUCCESS,
  CLEAR_OPERATIONAL_TABLE,
} from '../../actions/actionTypes';

export const operational = (state = {}, action) => {
  switch (action.type) {
    case FETCH_OPERATIONAL_TABLE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case CLEAR_OPERATIONAL_TABLE:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};
