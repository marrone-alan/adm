import { toast } from 'react-toastify';
import faker from 'faker';

import {
  FETCH_SYSTEM_REQUEST,
  FETCH_SYSTEM_SUCCESS,
  FETCH_SYSTEM_FAILURE,
  DELETE_SYSTEM_REQUEST,
  DELETE_SYSTEM_SUCCESS,
  DELETE_SYSTEM_FAILURE,
  ADD_SYSTEM_REQUEST,
  ADD_SYSTEM_SUCCESS,
  ADD_SYSTEM_FAILURE,
} from '../actionTypes';
// api
// import api from '../../config/api';
//storage
import { setErrors } from '../../services/storage';

const createFakeRowData = () => ({
  name: faker.name.firstName(),
  link: faker.image.image(),
  icon: faker.image.image(),
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const submit = async () => {
  let fakeData = [];
  await sleep(1000).then(() => {
    fakeData = Array.from({ length: 10 }, createFakeRowData);
  });
  return fakeData;
};

/**
 * Fetch the workflow status order
 */
export const fetchSystem = () => async (dispatch) => {
  dispatch({ type: FETCH_SYSTEM_REQUEST });

  try {
    // const response = await api.get('/report/access', {
    // params: { profile, status },
    // });

    const response = await submit();

    setErrors(response.errors);

    dispatch({ type: FETCH_SYSTEM_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: FETCH_SYSTEM_FAILURE,
      payload: error,
      error: true,
    });
  }
};

/**
 * Add permision
 */
export const addSystem = (values) => async (dispatch) => {
  dispatch({ type: ADD_SYSTEM_REQUEST });

  try {
    // const response = await api.get('/report/access', {
    // params: { profile, status },
    // });

    const response = await submit();

    setErrors(response.errors);

    dispatch({ type: ADD_SYSTEM_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: ADD_SYSTEM_FAILURE,
      payload: error,
      error: true,
    });
  }
};

/**
 * Delete permision
 */
export const deleteSystem = (id) => async (dispatch) => {
  dispatch({ type: DELETE_SYSTEM_REQUEST });

  try {
    // const response = await api.get('/report/access', {
    // params: { profile, status },
    // });

    const response = await submit();
    response.id = id;

    setErrors(response.errors);

    dispatch({ type: DELETE_SYSTEM_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: DELETE_SYSTEM_FAILURE,
      payload: error,
      error: true,
    });
  }
};
