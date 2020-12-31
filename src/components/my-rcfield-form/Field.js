import React from "react";
import FieldContext from "./FieldContext";

class Field extends React.Component {
  static contextType = FieldContext;

  componentDidMount() {
    this.unregisterEntity = this.context.registerEntity(this);
  }

  componentWillUnmount() {
    if (this.unregisterEntity) {
      this.unregisterEntity();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const { getFieldValue, setFieldsValue } = this.context;
    const { name } = this.props;
    return {
      value: getFieldValue(name), // todo get 从数据仓库取值
      onChange: e => {
        const newValue = e.target.value;
        // todo set 修改数据仓库中的值
        setFieldsValue({ [name]: newValue });
      },
    };
  };

  render() {
    const { children } = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}

export default Field;
