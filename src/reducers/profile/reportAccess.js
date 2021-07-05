import {
  FETCH_REPORT_ACCESS_TABLE_SUCCESS,
  CLEAR_REPORT_ACCESS_TABLE,
} from '../../actions/actionTypes';

export const reportAccess = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPORT_ACCESS_TABLE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case CLEAR_REPORT_ACCESS_TABLE:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};
