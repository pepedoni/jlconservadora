import * as types from "./constants";
import cookies from 'js-cookie';
import request from "api/request";
import {setCurrentLocation} from "core/actions/index"

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

const logoutSuccess = () => {
  return { 
    type: types.LOGOUT_SUCCESS
 };
};

const logoutFailure = () => {
  return { 
    type: types.LOGOUT_FAILURE
 };
};

const user = (user) => {
  return { 
    type: types.LOGIN_USER,
    payload: user
 };
}

export const login = (user) => (dispatch) => {
  dispatch(requestLogin());
  if(typeof user === "object" && user.hasOwnProperty("email") && user.hasOwnProperty("password")) {
    
    request.post('/auth/login', user)
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
          request.get('/auth/user').then((response) => {
            dispatch(loginSuccess(response.data));
            dispatch(user(response.data));
          }).catch(error => {
            dispatch(loginFailure(result.error));  
          });
        } else {
          dispatch(loginFailure(result.error));  
        }
      })
      .catch(error => {
        //console.log('[Login Error]', JSON.stringify(error));
        if(error.response.status == 401) dispatch(loginFailure(error.response.data.message));
        else dispatch(loginFailure("Ocorreu um erro ao realizar o login. Contate o administrador do sistema."));
      });
  } else {
    console.log('[Login Error]', 'Invalid object!');
    dispatch(loginFailure("Ocorreu um erro ao realizar o login. Contate o administrador do sistema."));
  }
};

export const logout = (history) => (dispatch) => { 
  dispatch(requestLogout());
  request.get("/auth/logout")
    .then(() => {
      cookies.set('@jl_token', ''); 
      cookies.set('@jl_expire', ''); 
      sessionStorage.setItem('@jl_token', '');
      localStorage.setItem('@jl_token', '');
      dispatch(logoutSuccess());
    }).catch(() => {
      dispatch(logoutFailure());
    }
  );
};

export const getUser = () => (dispatch) => {
  request.get('/auth/user').then((response) => {
    dispatch(user(response.data));
  });
}

export const TOKEN_KEY = '@jl_token';

export const getToken = () => localStorage.getItem('@jl_token');