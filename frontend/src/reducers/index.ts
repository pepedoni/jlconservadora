import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import auth from "features/auth/authReducer"
import employee from "features/employee/employeeReducer"
import general from "core/reducers"
import menu from "core/_menu/menuReducer"
import client from "features/client/clientReducer"
import service from "features/service/serviceReducer"
import company from "features/company/companyReducer"

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  menu,
  employee,
  general,
  client,
  company,
  service,
});