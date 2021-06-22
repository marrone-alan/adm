import {
  FETCH_IP_ADDRESS_TABLE_SUCCESS,
  CLEAR_IP_ADDRESS_TABLE,
  ADD_IP_ADDRESS_SUCCESS,
  DELETE_IP_ADDRESS_SUCCESS,
} from '../actions/actionTypes';

export const ipAddress = (state = {}, action) => {
  switch (action.type) {
    case FETCH_IP_ADDRESS_TABLE_SUCCESS:
      return {
        ...state,
        dataTable: action.payload,
        page: action.page,
      };
    case CLEAR_IP_ADDRESS_TABLE:
      return {
        ...state,
        dataTable: null,
      };
    case ADD_IP_ADDRESS_SUCCESS:
      return {
        ...state,
        dataNewIP: action.payload,
      };
    case DELETE_IP_ADDRESS_SUCCESS:
      delete state.dataTable.data[action.payload.id];
      return state;
    default:
      return state;
  }
};
