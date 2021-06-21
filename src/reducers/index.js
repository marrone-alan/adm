import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { menu } from './menu';

export default combineReducers({
  form,
  menu,
});
