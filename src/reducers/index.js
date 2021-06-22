import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { loading } from './loading.js';
import { error } from './error.js';

import { menu } from './menu';

import { access } from './report/access.js';
import { operational } from './report/operational.js';

export default combineReducers({
  form,
  menu,
  loading,
  error,
  access,
  operational,
});
