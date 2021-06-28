import { toast } from 'react-toastify';

import {
  FETCH_STATUS_ORDER_REQUEST,
  FETCH_STATUS_ORDER_SUCCESS,
  FETCH_STATUS_ORDER_FAILURE,
  CHANGE_STATUS_ORDER_REQUEST,
  CHANGE_STATUS_ORDER_SUCCESS,
  CHANGE_STATUS_ORDER_FAILURE,
} from '../actionTypes';
// api
// import api from '../../config/api';
//storage
import { setErrors } from '../../services/storage';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ativo = {
  id: 1,
  desc: 'Ativo',
  workflow: [
    { id: 1, desc: 'ok' },
    { id: 2, desc: 'pago' },
    { id: 3, desc: 'boleto' },
    { id: 4, desc: 'cartao' },
    { id: 5, desc: 'aguardando' },
    { id: 6, desc: 'fraude' },
    { id: 7, desc: 'deposito' },
    { id: 8, desc: 'cancelado' },
    { id: 9, desc: 'transporte' },
    { id: 10, desc: 'entregue' },
  ],
};

const inativo = {
  id: 2,
  desc: 'Inativo',
  workflow: [
    { id: 1, desc: 'ok' },
    { id: 2, desc: 'pago' },
    { id: 3, desc: 'boleto' },
    { id: 4, desc: 'cartao' },
    { id: 5, desc: 'aguardando' },
    { id: 6, desc: 'fraude' },
    { id: 7, desc: 'deposito' },
    { id: 8, desc: 'cancelado' },
    { id: 9, desc: 'transporte' },
    { id: 10, desc: 'entregue' },
  ],
};

const submit = async (status) => {
  let fakeData = {};
  await sleep(1000).then(() => {
    fakeData.status = [
      { id: 1, desc: 'Ativo' },
      { id: 2, desc: 'Inativo' },
    ];
    fakeData.initialValues = {
      status_pedido: {
        1: {
          1: true,
          2: false,
          3: true,
          4: false,
          5: true,
          6: true,
          7: false,
          8: false,
          9: true,
          10: true,
        },
        2: {
          1: false,
          2: true,
          3: false,
          4: true,
          5: false,
          6: false,
          7: true,
          8: true,
          9: false,
          10: false,
        },
      },
    };
    switch (status) {
      case '1':
        fakeData.workflow = [ativo];
        break;
      case '2':
        fakeData.workflow = [inativo];
        break;
      default:
        fakeData.workflow = [ativo, inativo];
        break;
    }
  });
  return fakeData;
};

/**
 * Fetch the workflow status order
 */
export const fetchStatusOrder = (profile, status) => async (dispatch) => {
  dispatch({ type: FETCH_STATUS_ORDER_REQUEST });

  try {
    // const response = await api.get('/report/access', {
    // params: { profile, status },
    // });

    const response = await submit(status);

    setErrors(response.errors);

    dispatch({ type: FETCH_STATUS_ORDER_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: FETCH_STATUS_ORDER_FAILURE,
      payload: error,
      error: true,
    });
  }
};

/**
 * Change the workflow status order
 */
export const changeStatusOrder = (values) => async (dispatch) => {
  dispatch({ type: CHANGE_STATUS_ORDER_REQUEST });

  try {
    // const response = await api.get('/report/access', {
    // params: { profile, status },
    // });

    const response = await submit(values.profile, values.status);

    setErrors(response.errors);

    dispatch({ type: CHANGE_STATUS_ORDER_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: CHANGE_STATUS_ORDER_FAILURE,
      payload: error,
      error: true,
    });
  }
};
