import {
  FETCH_WORKFLOW_PRODUCT_SUCCESS,
  ADD_PERMISSION_SUCCESS,
  DELETE_WORKFLOW_PRODUCT_SUCCESS,
} from '../../actions/actionTypes';

const INITIAL_STATE = {
  status: [],
};

export const product = (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case FETCH_WORKFLOW_PRODUCT_SUCCESS:
      return {
        ...state,
        workflow: action.payload.workflow,
      };
    case ADD_PERMISSION_SUCCESS:
      return {
        ...state,
        workflow: action.payload.workflow,
      };
    case DELETE_WORKFLOW_PRODUCT_SUCCESS:
      delete state.workflow.data[action.payload.id];
      return state;
    default:
      return state;
  }
};
