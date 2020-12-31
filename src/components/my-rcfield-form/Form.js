// * antd4 form 实现原理
// 创建数据仓库 统一管理state数据，提供get set函数，某个组件的state需要改变，则只更新对应组件，而不是更新这个组件

// ? antd3 form 实现原理
// 所有的数据都放在Form组件中，只要有其中一个数据发生变化，就让整个Form执行更新

import React, { useImperativeHandle } from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

function Form({ children, onFinish, onFinishFailed, form }, ref) {
  const [formInstance] = useForm(form);

  useImperativeHandle(ref, () => formInstance);

  formInstance.setCallbacks({ onFinish, onFinishFailed });

  return (
    <FieldContext.Provider value={formInstance}>
      <form
        onSubmit={e => {
          // 提交
          e.preventDefault();
          formInstance.submit();
        }}>
        {children}
      </form>
    </FieldContext.Provider>
  );
}

export default Form;
