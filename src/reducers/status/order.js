import { FETCH_STATUS_ORDER_SUCCESS } from '../../actions/actionTypes';

const INITIAL_STATE = {
  status: [],
};

export const order = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_STATUS_ORDER_SUCCESS:
      return {
        ...state,
        workflow: action.payload.workflow,
        status: action.payload.status,
        initialValues: action.payload.initialValues,
      };
    default:
      return state;
  }
};
