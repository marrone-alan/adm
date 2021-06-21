import { LOGIN } from './storage/types';

// get the access token
export const getToken = () => {
  return localStorage.getItem(LOGIN);
};
// set the access token on storage
export const login = (token) => {
  let result = false;
  if (token !== '' && typeof token !== 'undefined') {
    localStorage.setItem(LOGIN, token);
    result = true;
  }
  return result;
};

// checks if user is logged in
export const isAuthenticated = () => localStorage.getItem(LOGIN) !== null;

// logout of the system
export const logout = () => {
  localStorage.removeItem(LOGIN);
};
