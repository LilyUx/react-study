import React, { useReducer, useEffect } from "react";
import { counterReducer } from "../store";

const init = initArg => initArg - 0;

// ! useReducer 和 useState 类似
// useReducer 适合修改逻辑复杂的状态，因为可以把状态抽取到reducer中，方便复用
export default function HooksPage() {
  const [state, dispatch] = useReducer(counterReducer, "0", init);

  // DidMount/ DidUpdate / DidwillUnmount
  useEffect(() => {
    console.log("useEffect");
    return () => {
      console.log("willunmount");
    };
  }, [state]);

  return (
    <div>
      <h3>HooksPage</h3>
      <button onClick={() => dispatch({ type: "ADD" })}>{state}</button>
    </div>
  );
}
