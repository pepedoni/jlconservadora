import * as types from "./constants";

export default function(state = { user: undefined, loadingLogin: false, errorLogin: null }, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      console.log(`[Auth Reducer] Action: LOGIN_REQUEST`);
      return {
        user: undefined,
        loadingLogin: true,
        errorLogin: null
      };
    case types.LOGIN_SUCCESS:
      console.log(`[Auth Reducer] Action: LOGIN_SUCCESS`);
      return {
        user: action.payload,
        loadingLogin: false,
        errorLogin: null
      }
    case types.LOGIN_FAILURE:
      console.log(`[Auth Reducer] Action: LOGIN_FAILURE`);
      return {
        user: undefined,
        loadingLogin: false,
        errorLogin: action.payload
      }
    case types.LOGOUT:
      console.log(`[Auth Reducer] Action: LOGOUT`);
      return {
        user: undefined,
        loadingLogin: false,
        errorLogin: null
      }
    default:
      return state;
    }
}