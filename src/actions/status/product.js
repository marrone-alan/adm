import { toast } from 'react-toastify';

import {
  FETCH_WORKFLOW_PRODUCT_REQUEST,
  FETCH_WORKFLOW_PRODUCT_SUCCESS,
  FETCH_WORKFLOW_PRODUCT_FAILURE,
  DELETE_WORKFLOW_PRODUCT_REQUEST,
  DELETE_WORKFLOW_PRODUCT_SUCCESS,
  DELETE_WORKFLOW_PRODUCT_FAILURE,
  ADD_PERMISSION_REQUEST,
  ADD_PERMISSION_SUCCESS,
  ADD_PERMISSION_FAILURE,
} from '../actionTypes';
// api
// import api from '../../config/api';
//storage
import { setErrors } from '../../services/storage';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const submit = async () => {
  let fakeData = {};
  await sleep(1000).then(() => {
    fakeData.workflow = {
      status: 'Montagem Iniciada',
      data: [
        {
          statusAllowed: 'Produto Reprovado',
          statusOrder: 'Produção',
          statusItem: 'Montagem Iniciada',
          matrizType: 'Produto',
        },
        {
          statusAllowed: 'Montagem Reprovada',
          statusOrder: 'Produção',
          statusItem: 'Montagem Iniciada',
          matrizType: 'Produto',
        },
        {
          statusAllowed: 'Montagem Finalizada',
          statusOrder: '-',
          statusItem: 'Montagem Iniciada',
          matrizType: 'Produto',
        },
        {
          statusAllowed: 'Montagem Finalizada',
          statusOrder: '-',
          statusItem: '-',
          matrizType: 'SubProduto',
        },
        {
          statusAllowed: 'Montagem Finalizada',
          statusOrder: '-',
          statusItem: '-',
          matrizType: 'Produto',
        },
        {
          statusAllowed: 'Montagem Finalizada',
          statusOrder: '-',
          statusItem: '-',
          matrizType: 'SubProduto',
        },
      ],
    };
  });
  return fakeData;
};

/**
 * Fetch the workflow status order
 */
export const fetchWorkflowProduct = (status) => async (dispatch) => {
  dispatch({ type: FETCH_WORKFLOW_PRODUCT_REQUEST });

  try {
    // const response = await api.get('/report/access', {
    // params: { profile, status },
    // });

    const response = await submit();

    setErrors(response.errors);

    dispatch({ type: FETCH_WORKFLOW_PRODUCT_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: FETCH_WORKFLOW_PRODUCT_FAILURE,
      payload: error,
      error: true,
    });
  }
};

/**
 * Add permision
 */
export const addStatusProduct = (status) => async (dispatch) => {
  dispatch({ type: ADD_PERMISSION_REQUEST });

  try {
    // const response = await api.get('/report/access', {
    // params: { profile, status },
    // });

    const response = await submit(status);

    setErrors(response.errors);

    dispatch({ type: ADD_PERMISSION_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: ADD_PERMISSION_FAILURE,
      payload: error,
      error: true,
    });
  }
};

/**
 * Delete permision
 */
export const deleteStatusProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_WORKFLOW_PRODUCT_REQUEST });

  try {
    // const response = await api.get('/report/access', {
    // params: { profile, status },
    // });

    const response = await submit();
    response.id = id;

    setErrors(response.errors);

    dispatch({ type: DELETE_WORKFLOW_PRODUCT_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: DELETE_WORKFLOW_PRODUCT_FAILURE,
      payload: error,
      error: true,
    });
  }
};
