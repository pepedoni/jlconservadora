import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import auth from "features/auth/authReducer";
import general from "core/reducers";

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  general
});