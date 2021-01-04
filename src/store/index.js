// import { createStore, applyMiddleware, combineReducers } from "redux";
import { createStore, applyMiddleware, combineReducers } from "../kredux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
// import promise from "redux-logger";
import isPromise from "is-promise";
import { isFSA } from "flux-standard-action";

export const counterReducer = (state = 0, { type, payload = 1 }) => {
  switch (type) {
    case "ADD":
      return state + payload;
    case "MINUS":
      return state - payload;
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({ count: counterReducer })
  // counterReducer,
  // applyMiddleware(thunk, logger, promise)
);

// 处理异步的thunk
function thunk({ dispatch, getState }) {
  return next => action => {
    console.log(next);
    console.log(action);
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

function logger({ dispatch, getState }) {
  return next => action => {
    const prevState = getState();
    const returnValue = next(action);
    const nextState = getState();
    console.log("prevState", prevState);
    console.log("nextState", nextState);
    return returnValue;
  };
}

// function promise({ dispatch }) {
//   return next => action => {
//     return isPromise(action) ? action.then(dispatch) : next(action);
//   };
// }

function promise({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action) ? action.then(dispatch) : next(action);
    }
    return isPromise(action.payload)
      ? action.payload
          .then(result => dispatch({ ...action, payload: result }))
          .catch(error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          })
      : next(action);
  };
}

export default store;
