/*
 * @Description: Page:
 * @Author: xuling
 * @Date: 2020-12-08 19:41:16
 * @LastEditTime: 2020-12-31 16:37:17
 * @LastEditors: xuling
 * @UpdateLogs: logs
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { Provider } from "react-redux";
import { Provider } from "./kReactRedux/index";
import store from "./store/";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
