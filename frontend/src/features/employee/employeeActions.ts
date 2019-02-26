import * as types from "./constants";
import request from "api/request";

import cookies from 'js-cookie';
/**
 * Employee
 */

export const employeeAdd = () => {
    return { 
        type: types.EMPLOYEE_ADD
    };
};

export const employeeEdit = () => {
    return { 
        type: types.EMPLOYEE_EDIT
 }  ;
};

export const employeeView = () => {
    return {
        type: types.EMPLOYEE_VIEW
    }
}

export const employeeDelete= () => {
    return {
        type: types.EMPLOYEE_DELETE
    }
}

export const employeeCloseForm = () => {
  return { 
    type: types.EMPLOYEE_CLOSEFORM
 };
};

const employeeSaveSuccess = () => {
    return { 
        type: types.EMPLOYEE_SAVE_SUCCESS
    };
};

const employeeSaveFailure = () => {
    return { 
        type: types.EMPLOYEE_SAVE_FAILURE
    };
};

const loading = (loading) => {
    return {
        type: types.LOADING,
        payload: loading
    }
}

export const onRowClick = (record) => {
    return {
        type: types.ON_ROW_CLICK,
        payload: record
    }
}

export const employeeSave = (employee) => (dispatch) => { 
    console.log('1');
    dispatch(loading(true));
    console.log('2');
    request.get('/employee').then( response =>  {
        dispatch(employeeSaveSuccess);
        dispatch(loading(false));
    }).catch( error => {
        dispatch(employeeSaveFailure);
        dispatch(loading(false));
    });
}
