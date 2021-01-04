import React, {
  useContext,
  useReducer,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";

// 跨层级数据传递
// 分三步走

// * step1 : 创建一个context对象
const Context = React.createContext();

// * step2 : 使用Provider传递value
export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>;
}

// * step3 : 子组件消费cntext value: Consumer contextType useContext
// contextType 只能使用在类组件中，并且只能订阅单一的context来源
// useContext只能用在函数组件和自定义hook中

// hoc 是个函数，接收组件作为参数，并且返回一个组件
export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => props => {
  const store = useContext(Context);
  const { getState, dispatch, subscribe } = store;

  const stateProps = mapStateToProps(getState());
  let dispatchProps = { dispatch };

  // 对象情况
  if (typeof mapDispatchToProps === "object") {
    dispatchProps = bindActionCreator(mapDispatchToProps, dispatch);
  } else if (typeof mapDispatchToProps === "function") {
    // 函数情况
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

  // useEffect 延迟执行
  // useLayoutEffect 同步调用
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate();
    });

    // 组件卸载之前取消订阅
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [store]);

  return selectedState;
}

export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}

// ? 函数组件怎么forceUpdate
// 做订阅 取消订阅 useReducer | useState
// 自定义hook
function useForceUpdate() {
  // const [ignored, update] = useReducer(x => x + 1, 0);
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState(prev => prev + 1);
  }, []);
  return update;
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
