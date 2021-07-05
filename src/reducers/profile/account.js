import { FETCH_ACCOUNT_DATA_SUCCESS } from '../../actions/actionTypes';

export const account = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};
