import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { loading } from './loading.js';
import { error } from './error.js';

import { menu } from './menu';

import { access } from './report/access.js';
import { operational } from './report/operational.js';
import { ipAddress } from './ipAddress.js';
import { order } from './status/order.js';
import { product } from './status/product.js';
import { system } from './resource/system.js';

export default combineReducers({
  form,
  menu,
  loading,
  error,
  access,
  operational,
  ipAddress,
  order,
  product,
  system,
});
