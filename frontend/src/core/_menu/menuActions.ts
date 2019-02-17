import * as types from "./constants";
import cookies from 'js-cookie';
import request from "api/request";

/**
 * Menu
 */
const requestMenu = () => {
  return { 
    type: types.MENU_REQUEST
  };
};

const menuSuccess = (menu) => {
    return { 
        type: types.MENU_SUCCESS,
        payload: menu
    };
};

const menuFailure = () => {
    return { 
        type: types.MENU_FAILURE,
    };
};

export const getMenu = () => (dispatch) => { 
  dispatch(requestMenu());
  request.get("/menu/buildMenu")
    .then((response) => {
      dispatch(menuSuccess(response.data));
    }).catch(() => {
      dispatch(menuFailure());
    }
  );
};