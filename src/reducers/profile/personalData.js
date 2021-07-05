import { FETCH_PERSONAL_DATA_SUCCESS } from '../../actions/actionTypes';

export const personalData = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PERSONAL_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
