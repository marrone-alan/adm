import { FORM_FIELD_ERROR } from './types';

export const setErrors = (errors) => {
  if (errors) {
    localStorage.setItem(FORM_FIELD_ERROR, JSON.stringify(errors));
  }
};

export const getErrors = () => {
  return JSON.parse(localStorage.getItem(FORM_FIELD_ERROR));
};

export const clearErrors = () => {
  localStorage.removeItem(FORM_FIELD_ERROR);
};
