import { toast } from 'react-toastify';

import {
  FETCH_ACCOUNT_DATA_REQUEST,
  FETCH_ACCOUNT_DATA_SUCCESS,
  FETCH_ACCOUNT_DATA_FAILURE,
} from '../actionTypes';
// faker
import faker from 'faker';
// api
// import api from '../../config/api';
//storage
import { setErrors } from '../../services/storage';

const createFakeRowData = () => ({
  firstName: faker.name.firstName(),
  status: [
    faker.name.title(),
    faker.name.title(),
    faker.name.title(),
    faker.name.title(),
    faker.name.title(),
  ],
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const submit = async () => {
  let fakeData = {};
  await sleep(1000).then(() => {
    fakeData.data = Array.from({ length: 3 }, createFakeRowData);
    fakeData.last_page = 3;
  });
  return fakeData;
};

/**
 * Fetch the account data
 */
export const fetchAccountData = () => async (dispatch) => {
  dispatch({ type: FETCH_ACCOUNT_DATA_REQUEST });

  try {
    // const response = await api.get('/adm/ip-address', {
    //   params: page,
    // });

    const response = await submit();

    setErrors(response.errors);

    dispatch({ type: FETCH_ACCOUNT_DATA_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: FETCH_ACCOUNT_DATA_FAILURE,
      payload: error,
      error: true,
    });
  }
};
