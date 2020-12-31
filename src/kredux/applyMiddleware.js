function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);

    // 初始值
    let dispatch = store.dispatch;

    const middleAPI = {
      getState: store.getState,
      dispatch: (action, ...arg) => dispatch(action, ...arg),
    };

    // middlewaresChain 与 middlewares不同，前者是有middleAPI的
    const middlewaresChain = middlewares.map(middleware =>
      middleware(middleAPI)
    );

    // console.log(middlewaresChain);

    dispatch = compose(...middlewaresChain)(store.dispatch);
    // console.log(dispatch);

    // 加强dispatch

    return {
      ...store,
      // 返回加强版的dispatch
      dispatch,
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export default applyMiddleware;
