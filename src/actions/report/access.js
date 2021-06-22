import { toast } from 'react-toastify';

import {
  FETCH_ACCESS_TABLE_REQUEST,
  FETCH_ACCESS_TABLE_SUCCESS,
  FETCH_ACCESS_TABLE_FAILURE,
  CLEAR_ACCESS_TABLE,
} from '../actionTypes';
// faker
import faker from 'faker';
// api
// import api from '../../config/api';
//storage
import { setErrors } from '../../services/storage';

const createFakeRowData = () => ({
  firstName: faker.name.firstName(),
  status: faker.name.lastName(),
  system: faker.name.title(),
  date: faker.name.jobDescriptor(),
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const submit = async () => {
  let fakeData = {};
  await sleep(1000).then(() => {
    fakeData.data = Array.from({ length: 10 }, createFakeRowData);
    fakeData.last_page = 3;
  });
  return fakeData;
};

/**
 * Fetch the access table data
 * @param {string} user
 * @param {int} profile
 * @param {date} initial_date
 * @param {date} final_date
 * @param {paginate} page
 */
export const fetchAccessTable =
  (user, profile, initial_date, final_date, page) => async (dispatch) => {
    dispatch({ type: FETCH_ACCESS_TABLE_REQUEST });

    try {
      // const response = await api.get('/report/access', {
      // params: { user, profile, initial_date, final_date, page },
      // });

      const response = await submit();

      setErrors(response.errors);

      dispatch({ type: FETCH_ACCESS_TABLE_SUCCESS, payload: response });
    } catch (error) {
      toast.error(error.message);
      dispatch({
        type: FETCH_ACCESS_TABLE_FAILURE,
        payload: error,
        error: true,
      });
    }
  };

/**
 * empties the access table data
 */
export const clearAccessTable = () => {
  return {
    type: CLEAR_ACCESS_TABLE,
  };
};
