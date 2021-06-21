import { SHOW_HIDE_MENU, HIDE_MENU } from '../actions/actionTypes';

const INITIAL_STATE = {
  isMenuVisible: true,
};

export const menu = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_HIDE_MENU:
      return {
        ...state,
        isMenuVisible: !state.isMenuVisible,
      };
    case HIDE_MENU:
      return {
        ...state,
        isMenuVisible: false,
      };
    default:
      return state;
  }
};
