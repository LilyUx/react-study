import React, {
  useContext,
  useReducer,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";

const Context = React.createContext();

export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => props => {
  const store = useContext(Context);
  const { getState, dispatch, subscribe } = store;
  const stateProps = mapStateToProps(getState());
  let dispatchProps = dispatch;

  if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreator(mapDispatchToProps, dispatch);
  } else if (typeof mapDispatchToProps === "function") {
    dispatchProps = mapDispatchToProps(dispatch);
  }

  const forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    const unsubcribe = subscribe(() => {
      forceUpdate();
    });
    return () => {
      if (unsubcribe) {
        unsubcribe();
      }
    };
  }, [store]);

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

/**
 * Hook API 实现
 */
export function useStore() {
  const store = useContext(Context);
  return store;
}

export function useSelector(selector) {
  const store = useStore();
  const { getState, subscribe } = store;
  const selectedState = selector(getState());

  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate();
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [store]);

  return selectedState;
}

export function useDispatch() {
  const store = useStore();
  return store.dispatch();
}

export function useForceUpdate() {
  // const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [state, setState] = useState[0];
  const forceUpdate = useCallback(prev => {
    setState(prev + 1);
  }, []);
  return forceUpdate;
}

export function bindActionCreators(creators, dispatch) {
  let obj = {};
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}
