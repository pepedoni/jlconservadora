import * as types from "./constants";

export default function(state = { formOpen: false, mode: null }, action) {
  switch (action.type) {
    case types.EMPLOYEE_ADD:
      console.log(`[Employee Reducer] Action: EMPLOYEE_ADD`);
      return {
        ...state,
        formOpen: true,
        mode: 'view'
      };
    case types.EMPLOYEE_EDIT:
      console.log(`[Employee Reducer] Action: EMPLOYEE_EDIT`);
      return {
        ...state,
        formOpen: true,
        mode: 'edit'
      };
    case types.EMPLOYEE_VIEW:
      console.log(`[Employee Reducer] Action: EMPLOYEE_VIEW`);
      return {
        ...state,
        formOpen: true,
        mode: 'view'
      };
    case types.EMPLOYEE_DELETE:
      console.log(`[Employee Reducer] Action: EMPLOYEE_DELETE`);
      return {
        ...state,
        formOpen: true,
        mode: 'delete'
      };
    case types.EMPLOYEE_CLOSEFORM:
      console.log(`[Employee Reducer] Action: EMPLOYEE_FORM_CLOSE`);
      return {
        ...state,
        formOpen: false,
        mode: null
      }
    default:
      return state;
    }
}