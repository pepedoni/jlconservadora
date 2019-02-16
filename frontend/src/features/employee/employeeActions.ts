import * as types from "./constants";
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
