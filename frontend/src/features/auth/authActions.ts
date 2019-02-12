import * as types from "./constants";
import config from "config";
import { object } from "prop-types";
import cookies from 'js-cookie';
import request from "api/request";

/**
 * Login
 */
const requestLogin = () => {
  return { 
    type: types.LOGIN_REQUEST
 };
};

const loginSuccess = (userInfo) => {
  return { 
    type: types.LOGIN_SUCCESS,
    payload: userInfo
 };
};

const loginFailure = (error) => {
  return { 
    type: types.LOGIN_FAILURE,
    payload: error
 };
};

const requestLogout = () => {
  return { 
    type: types.LOGOUT
 };
};

export const login = user => (dispatch, getState, axios) => {
  dispatch(requestLogin());
  if(typeof user === "object" && user.hasOwnProperty("email") && user.hasOwnProperty("password")) {
    
    request.post('/api/auth/login', user)
      .then(response => response.data)
      .then(result => {
        if(result) {
          if(user.rememberMe) {
            cookies.set('@jl_token', result.access_token);
            localStorage.setItem('@jl_token', result.access_token);
            cookies.set('@jl_expire', result.expire_at)
          } else {
            sessionStorage.setItem('@jl_token', result.access_token);
          }
          request.get('/api/auth/user').then((response) => {
            dispatch(loginSuccess(response.data));
          }).catch(error => {
            dispatch(loginFailure(result.error));  
          });
        } else {
          dispatch(loginFailure(result.error));  
        }
      })
      .catch(error => {
        //console.log('[Login Error]', JSON.stringify(error));
        dispatch(loginFailure(error));
      });
  } else {
    console.log('[Login Error]', 'Invalid object!');
    dispatch(loginFailure());
  }
};

export const logout = () => async (dispatch, getState, axios) => {
  if(cookies.get('@jl_token'))
    await cookies.remove('@jl_token')
  
  if(sessionStorage.getItem('@jl_token'))
    await sessionStorage.removeItem('@jl_token');

  dispatch(requestLogout());            
  window.location.reload();
};