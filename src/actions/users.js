import { toast } from 'react-toastify';
import faker from 'faker';

import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from './actionTypes';
// api
// import api from '../../config/api';
//storage
import { setErrors } from '../services/storage';

const createFakeRowData = () => ({
  login: faker.name.firstName(),
  date_inc: faker.name.firstName(),
  date_access: faker.name.firstName(),
  status: faker.name.firstName(),
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
export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });

  try {
    // const response = await api.get('/report/access', {
    // params: { profile, status },
    // });

    const response = await submit();

    setErrors(response.errors);

    dispatch({ type: FETCH_USERS_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error,
      error: true,
    });
  }
};
