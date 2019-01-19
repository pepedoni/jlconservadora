import axios from "axios";
import { getToken } from "./auth";

const request = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

request.interceptors.request.use(config => {
  console.log('1');
  const token = getToken();
  config.headers = {
    'Content-type': 'application/json; charset=utf-8',
    'Accept': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default request;