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
import { action } from './resource/action.js';
import { users } from './users.js';
import { account } from './profile/account.js';
import { reportAccess } from './profile/reportAccess.js';
import { personalData } from './profile/personalData.js';

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
  action,
  users,
  account,
  reportAccess,
  personalData,
});
