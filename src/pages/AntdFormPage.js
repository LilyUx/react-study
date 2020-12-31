/*
 * @Description: Page:
 * @Author: xuling
 * @Date: 2020-12-21 18:49:53
 * @LastEditTime: 2020-12-28 16:27:36
 * @LastEditors: xuling
 * @UpdateLogs: logs
 */
import React, { Component, useEffect } from "react";
import { Form, Input, Button } from "antd";

const FormItem = Form.Item;
const nameRules = { required: true, message: "请输⼊姓名！" };
const passworRules = { required: true, message: "请输⼊密码！" };

export default function AntdFormPage(props) {
  const [form] = Form.useForm();

  const onFinish = val => {
    console.log("onFinish", val);
  };

  const onFinishFailed = val => {
    console.log("onFinishFailed", val);
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({ name: "default" });
  }, []);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onReset={onReset}>
      <FormItem label="姓名" name="name" rules={[nameRules]}>
        <Input placeholder="请输入姓名" />
      </FormItem>
      <FormItem label="密码" name="password" rule={[passworRules]}>
        <Input placeholder="请输入密码" />
      </FormItem>
      <FormItem>
        <Button type="primary" size="large" htmlType="submit">
          Submit
        </Button>
      </FormItem>
      <FormItem>
        <Button type="primary" size="large" htmlType="reset">
          Reset
        </Button>
      </FormItem>
    </Form>
  );
}

// export default class AntdFormPage extends Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.formRef = React.createRef();
//   // }
//   // formRef = React.createRef();

//   componentDidMount() {
//     this.formRef.current.setFieldsValue({ name: "default" });
//   }

//   onReset = () => {
//     this.formRef.current.resetFields();
//   };

//   onFinish = val => {
//     console.log("onFinish", val);
//   };

//   onFinishFailed = val => {
//     console.log("onFinishFailed", val);
//   };
//   render() {
//     console.log(this.formRef.current);
//     return (
//       <Form
//         ref={this.formRef}
//         onFinish={this.onFinish}
//         onFinishFailed={this.onFinishFailed}
//         onReset={this.onReset}>
//         <FormItem label="姓名" name="name" rules={[nameRules]}>
//           <Input placeholder="请输入姓名" />
//         </FormItem>
//         <FormItem label="密码" name="password" rule={[passworRules]}>
//           <Input placeholder="请输入密码" />
//         </FormItem>
//         <FormItem>
//           <Button type="primary" size="large" htmlType="submit">
//             Submit
//           </Button>
//         </FormItem>
//         <FormItem>
//           <Button type="primary" size="large" htmlType="reset">
//             Reset
//           </Button>
//         </FormItem>
//       </Form>
//     );
//   }
// }
