export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // 加强
    return enhancer(createStore)(reducer);
  }

  let currentState;
  let currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach(listener => listener());
  }

  // 订阅
  function subscribe(listener) {
    currentListeners.push(listener);
    // 取消订阅
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.slice(index, 1);
    };
  }

  dispatch({ type: "anfdafna" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
