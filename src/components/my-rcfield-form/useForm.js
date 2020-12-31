import React from "react";

class FormStore {
  constructor() {
    this.store = {}; // 存储state数据，以key value形式存储

    this.fieldEntities = []; // 存储组件

    this.callbacks = {}; // 存储callbacks
  }

  setCallbacks = newCallbacks => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  registerEntity = entity => {
    // 注册
    this.fieldEntities.push(entity);
    // 取消注册
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  getFieldValue = name => {
    return this.store[name];
  };

  getFieldsValue = () => {
    return { ...this.store };
  };

  // set函数 newStore可以定义多个state
  setFieldsValue = newStore => {
    // 数据更新
    this.store = {
      ...this.store,
      ...newStore,
    };
    // 组件更新
    // 对应组件进行更新
    this.fieldEntities.forEach(entity => {
      Object.keys(newStore).forEach(k => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };

  validate = () => {
    let err = [];
    // todo 校验
    this.fieldEntities.forEach(field => {
      // 从实例拿到name和校验规则
      const { name, rules } = field.props;
      let rule = rules && rules[0];
      let value = this.getFieldValue(name);
      if (rule && rule.required && (value === undefined || value === "")) {
        err.push({
          [name]: rule.message,
          value,
        });
      }
    });

    // console.log(err);

    return err;
  };

  submit = () => {
    const { onFinish, onFinishFailed } = this.callbacks;
    const err = this.validate();
    // 先校验
    // 校验通过，执行onFinish
    // 校验失败，执行onFinishFailed
    if (err.length === 0) {
      // 成功
      onFinish(this.getFieldsValue());
    } else {
      onFinishFailed(err, this.getFieldsValue);
    }
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerEntity: this.registerEntity,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
    };
  };
}

export default function useForm(form) {
  // 类组件可以保存值，函数组件不行，hook可以
  // * formRef 是为了存值
  const formRef = React.useRef();

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}
