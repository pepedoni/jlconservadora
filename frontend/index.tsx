import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { loadProgressBar } from 'axios-progress-bar';
import configureStore from './src/store';
import Router from "routes";

//const store = configureStore();
const store = configureStore();

// loadProgressBar();

ReactDOM.render((
  <Provider store={store}>
    <Router />
  </Provider>
), document.getElementById("root"));