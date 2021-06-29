import { toast } from 'react-toastify';
import faker from 'faker';

import {
  FETCH_ACTION_REQUEST,
  FETCH_ACTION_SUCCESS,
  FETCH_ACTION_FAILURE,
  DELETE_ACTION_REQUEST,
  DELETE_ACTION_SUCCESS,
  DELETE_ACTION_FAILURE,
  ADD_ACTION_REQUEST,
  ADD_ACTION_SUCCESS,
  ADD_ACTION_FAILURE,
} from '../actionTypes';
// api
// import api from '../../config/api';
//storage
import { setErrors } from '../../services/storage';

const createFakeRowData = () => ({
  action: faker.name.firstName(),
  controller: faker.name.firstName(),
  system: faker.name.firstName(),
  module: faker.image.image(),
  desc: faker.lorem.sentence(),
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
 * Fetch the action
 */
export const fetchAction = () => async (dispatch) => {
  dispatch({ type: FETCH_ACTION_REQUEST });

  try {
    // const response = await api.get('/report/access', {
    // params: { profile, status },
    // });

    const response = await submit();

    setErrors(response.errors);

    dispatch({ type: FETCH_ACTION_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: FETCH_ACTION_FAILURE,
      payload: error,
      error: true,
    });
  }
};

/**
 * Add action
 */
export const addAction = (values) => async (dispatch) => {
  dispatch({ type: ADD_ACTION_REQUEST });

  try {
    // const response = await api.get('/report/access', {
    // params: { profile, status },
    // });

    const response = await submit();

    setErrors(response.errors);

    dispatch({ type: ADD_ACTION_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: ADD_ACTION_FAILURE,
      payload: error,
      error: true,
    });
  }
};

/**
 * Delete action
 */
export const deleteAction = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ACTION_REQUEST });

  try {
    // const response = await api.get('/report/access', {
    // params: { profile, status },
    // });

    const response = await submit();
    response.id = id;

    setErrors(response.errors);

    dispatch({ type: DELETE_ACTION_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: DELETE_ACTION_FAILURE,
      payload: error,
      error: true,
    });
  }
};
