import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "../kReactRedux/";
// import { bindActionCreators } from "redux";

@connect(
  // 1. mapStateToProps
  // state => ({ count: state.count })
  ({ count }) => ({ count }),
  // 2. mapDispatchToProps object | function

  // object
  // {
  //   add: () => ({
  //     type: "ADD",
  //   }),
  // }

  // function
  dispatch => {
    // const add = () => dispatch({ type: "ADD" });
    // const minus = () => dispatch({ type: "MINUS" });

    let creators = {
      add: () => ({ type: "ADD" }),
      minus: () => ({ type: "MINUS" }),
    };
    creators = bindActionCreators(creators, dispatch);
    return { dispatch, ...creators };
  }
)
class ReactReduxPage extends Component {
  add = () => {
    this.props.dispatch({ type: "ADD", payload: 100 });
  };

  // minus = () => {
  //   this.props.dispatch(Promise.resolve({ type: "MINUS", payload: 1 }));
  // };

  render() {
    console.log("this.props", this.props);
    const { count, add, minus } = this.props;
    return (
      <div>
        <h3>ReduxPage</h3>
        <div>{count}</div>
        <button onClick={this.add}>ADD</button>
        <button onClick={add}>Asy ADD</button>
        <button onClick={minus}>MINUS</button>
      </div>
    );
  }
}

export default ReactReduxPage;
