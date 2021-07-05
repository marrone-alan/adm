import { toast } from 'react-toastify';

import {
  FETCH_PERSONAL_DATA_REQUEST,
  FETCH_PERSONAL_DATA_SUCCESS,
  FETCH_PERSONAL_DATA_FAILURE,
  SAVE_PERSONAL_DATA_REQUEST,
  SAVE_PERSONAL_DATA_SUCCESS,
  SAVE_PERSONAL_DATA_FAILURE,
} from '../actionTypes';
// faker
import faker from 'faker';
// api
// import api from '../../config/api';
//storage
import { setErrors } from '../../services/storage';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const submit = async () => {
  let fakeData = {};
  await sleep(1000).then(() => {
    fakeData = {
      name: faker.name.findName(),
      login: faker.name.firstName(),
      dta_nasc: faker.date.past(),
      facebook: faker.name.lastName(),
      cellphone: faker.phone.phoneNumberFormat(),
      phone: faker.phone.phoneNumberFormat(),
      contact: faker.name.firstName(),
      contact_phone: faker.phone.phoneNumberFormat(),
      profile: faker.name.firstName(),
      desc: faker.name.firstName(),
      blood_type: 2,
    };
  });
  return fakeData;
};

/**
 * Save personal data
 */
export const fetchPersonalData = () => async (dispatch) => {
  dispatch({ type: FETCH_PERSONAL_DATA_REQUEST });

  try {
    // const response = await api.get('/adm/ip-address', {
    //   params: page,
    // });

    const response = await submit();

    setErrors(response.errors);

    dispatch({ type: FETCH_PERSONAL_DATA_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: FETCH_PERSONAL_DATA_FAILURE,
      payload: error,
      error: true,
    });
  }
};

/**
 * Save personal data
 */
export const savePersonalData = () => async (dispatch) => {
  dispatch({ type: SAVE_PERSONAL_DATA_REQUEST });

  try {
    // const response = await api.get('/adm/ip-address', {
    //   params: page,
    // });

    const response = await submit();

    setErrors(response.errors);

    dispatch({ type: SAVE_PERSONAL_DATA_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: SAVE_PERSONAL_DATA_FAILURE,
      payload: error,
      error: true,
    });
  }
};
