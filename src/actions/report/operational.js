import { toast } from 'react-toastify';

import {
  FETCH_OPERATIONAL_TABLE_REQUEST,
  FETCH_OPERATIONAL_TABLE_SUCCESS,
  FETCH_OPERATIONAL_TABLE_FAILURE,
  CLEAR_OPERATIONAL_TABLE,
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
 * Fetch the operational table data
 * @param {string} user
 * @param {int} profile
 * @param {date} initial_date
 * @param {date} final_date
 * @param {int} order
 * @param {paginate} page
 */
export const fetchOperationalTable =
  (user, profile, initial_date, final_date, page) => async (dispatch) => {
    dispatch({ type: FETCH_OPERATIONAL_TABLE_REQUEST });
    try {
      // const response = await api.get('/report/operational', {
      // params: { user, profile, initial_date, final_date, page },
      // });

      const response = await submit();

      setErrors(response.errors);

      dispatch({ type: FETCH_OPERATIONAL_TABLE_SUCCESS, payload: response });
    } catch (error) {
      toast.error(error.message);

      dispatch({
        type: FETCH_OPERATIONAL_TABLE_FAILURE,
        payload: error,
      });
    }
  };

/**
 * empties the access table data
 */
export const clearOperationalTable = () => {
  return {
    type: CLEAR_OPERATIONAL_TABLE,
  };
};
