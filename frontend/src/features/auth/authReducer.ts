import * as types from "./constants";

export default function(state = { user: undefined, loadingLogin: false, errorLogin: null, logginOut: false, logged: true }, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      console.log(`[Auth Reducer] Action: LOGIN_REQUEST`);
      return {
        user: undefined,
        loadingLogin: true,
        errorLogin: null,
        logged: true,
        logginOut: false
      };
    case types.LOGIN_SUCCESS:
      console.log(`[Auth Reducer] Action: LOGIN_SUCCESS`);
      return {
        ...state,
        user: action.payload,
        loadingLogin: false,
        errorLogin: null,
        logged: true,
        logginOut: false
      }
    case types.LOGIN_FAILURE:
      console.log(`[Auth Reducer] Action: LOGIN_FAILURE`);
      return {
        user: undefined,
        loadingLogin: false,
        errorLogin: action.payload,
        logged: false,
        logginOut: false
      }
    case types.LOGOUT:
      console.log(`[Auth Reducer] Action: LOGOUT`);
      return {
        ...state,
        user: state.user,
        loadingLogin: false,
        errorLogin: null,
        logged: true,
        logginOut: true
      }
    case types.LOGOUT_SUCCESS:
      console.log(`[Auth Reducer] Action: LOGOUT_SUCCESS`);
      return {
        ...state,
        user: undefined,
        loadingLogin: false,
        logged: false,
        errorLogin: null,
        logginOut: false
      }
    case types.LOGOUT_FAILURE:
      console.log(`[Auth Reducer] Action: LOGOUT_FAILURE`);
      return { ...state, logged: false, logginOut: false}
    case types.LOGIN_USER:
      console.log(`[Auth Reducer] Action: LOGOUT_FAILURE`);
      return { ...state, user: action.payload}
    default:
      return state;
    }
}