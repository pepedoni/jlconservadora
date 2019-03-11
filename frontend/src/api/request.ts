import axios from "axios";
import cookies from 'js-cookie';
import { getToken } from "../features/auth/authActions";

const request = axios.create({
  baseURL: "http://127.0.0.1:8000/api"
});

request.interceptors.request.use(config => {

  const token = getToken();
  const csrf = cookies.get('XSRF-TOKEN');

  config.headers = {
    'Content-type': 'application/json; charset=utf-8',
    'Accept': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  };

  

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if(csrf) {
    if(!config.headers.common) {
      config.headers.common = {};
    }
    config.headers.common["XSRF-TOKEN"] = csrf;
  }

  return config;
});

export default request;