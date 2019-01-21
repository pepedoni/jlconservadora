import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';
import api from '../api';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

const requestLogin = creds => {
  return {
    type: types.LOGIN_REQUEST,
    isAuthenticated: false,
    creds
  };
};

const receiveLogin = auth => {
  return {
    type: types.LOGIN_SUCCESS,
    isAuthenticated: true,
    user: auth.user
  };
};

const loginError = message => {
  return {
    type: types.LOGIN_FAILURE,
    isAuthenticated: false,
    message
  };
};

const requestLogout = () => {
  return {
    type: types.LOGOUT_REQUEST,
    isAuthenticated: true
  };
};

const receiveLogout = () => {
  return {
    type: types.LOGOUT_SUCCESS,
    isAuthenticated: false
  };
};

const logoutError = message => {
  return {
    type: types.LOGOUT_FAILURE,
    isAuthenticated: true,
    message
  };
};

// Calls the API to get a token and
// dispatches actions along the way
export const loginUser = creds => (

  dispatch => {
    dispatch(beginAjaxCall());

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return api.auth.authenticate(creds)
      .then(auth => {
        // If login was successful, set the token in local storage
        //localStorage.setItem('@jl_token', creds.jl_token);
        localStorage.setItem('user', JSON.stringify(auth.user));

        // Dispatch the success action
        dispatch(receiveLogin(auth));
      }).catch(error => {
        dispatch(ajaxCallError(error));
        dispatch(loginError(error.message));
        throw error;
      });
  }
);

// Logs the user out
export const logoutUser = () => {
  return dispatch => {
    dispatch(requestLogout());
    return api.auth.logout()
      .then(response => {
        localStorage.removeItem('@jl_token');
        localStorage.removeItem('user');
        dispatch(receiveLogout());
        browserHistory.push('/');
      }).catch(error => {
        dispatch(ajaxCallError(error));
        dispatch(logoutError(error.message))
      });
  };
};
