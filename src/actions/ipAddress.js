import { toast } from 'react-toastify';

import {
  FETCH_IP_ADDRESS_TABLE_REQUEST,
  FETCH_IP_ADDRESS_TABLE_SUCCESS,
  FETCH_IP_ADDRESS_TABLE_FAILURE,
  CLEAR_IP_ADDRESS_TABLE,
  ADD_IP_ADDRESS_REQUEST,
  ADD_IP_ADDRESS_SUCCESS,
  ADD_IP_ADDRESS_FAILURE,
  DELETE_IP_ADDRESS_REQUEST,
  DELETE_IP_ADDRESS_SUCCESS,
  DELETE_IP_ADDRESS_FAILURE,
} from './actionTypes';
// faker
import faker from 'faker';
// api
// import api from '../../config/api';
//storage
import { setErrors } from '../services/storage';

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
 * @param {object} formValues
 */
export const fetchIPAddressTable = (page) => async (dispatch) => {
  dispatch({ type: FETCH_IP_ADDRESS_TABLE_REQUEST });

  try {
    // const response = await api.get('/adm/ip-address', {
    //   params: page,
    // });

    const response = await submit();

    setErrors(response.errors);

    dispatch({ type: FETCH_IP_ADDRESS_TABLE_SUCCESS, payload: response, page });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: FETCH_IP_ADDRESS_TABLE_FAILURE,
      payload: error,
      error: true,
    });
  }
};

/**
 * empties the ip address table data
 */
export const clearIPAddressTable = () => {
  return {
    type: CLEAR_IP_ADDRESS_TABLE,
  };
};

/**
 * Add IP address
 * @param {object} formValues
 */
export const addIPAddress = (formValues) => async (dispatch) => {
  dispatch({ type: ADD_IP_ADDRESS_REQUEST });

  try {
    // const response = await api.get('/adm/add-ip', {
    //   params: page,
    // });

    const response = await submit();

    setErrors(response.errors);

    dispatch({ type: ADD_IP_ADDRESS_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: ADD_IP_ADDRESS_FAILURE,
      payload: error,
      error: true,
    });
  }
};

/**
 * Delete IP address
 * @param {int} id
 */
export const deleteIPAddress = (id) => async (dispatch) => {
  dispatch({ type: DELETE_IP_ADDRESS_REQUEST });

  try {
    // const response = await api.get('/adm/delete-ip', {
    //   params: page,
    // });

    const response = await submit();
    response.id = id;
    dispatch({ type: DELETE_IP_ADDRESS_SUCCESS, payload: response });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: DELETE_IP_ADDRESS_FAILURE,
      payload: error,
      error: true,
    });
  }
};
