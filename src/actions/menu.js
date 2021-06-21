import { SHOW_HIDE_MENU, HIDE_MENU } from './actionTypes';

/**
 * toggle the menu bar
 */
export const showHideMenu = () => {
  return {
    type: SHOW_HIDE_MENU,
  };
};

/**
 * hide the menu bar
 */
export const hideMenu = () => {
  return {
    type: HIDE_MENU,
  };
};
