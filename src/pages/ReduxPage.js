import React, { Component } from "react";
import store from "../store";

export default class ReduxPage extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
    // 取消订阅
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  add = () => {
    store.dispatch({ type: "ADD", payload: 100 });
  };

  asyAdd = () => {
    // 不使用中间件
    // setTimeout(() => {
    //   store.dispatch({ type: "ADD", payload: 100 });
    // }, 2000);

    // 使用中间件
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: "ADD", payload: 100 });
      }, 2000);
    });
  };

  minus = () => {
    store.dispatch(Promise.resolve({ type: "MINUS", payload: 1 }));
  };

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <div>{store.getState().count}</div>
        <button onClick={this.add}>ADD</button>
        <button onClick={this.asyAdd}>Asy ADD</button>
        <button onClick={this.minus}>MINUS</button>
      </div>
    );
  }
}
