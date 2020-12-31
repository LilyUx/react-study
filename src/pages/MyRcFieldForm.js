/*
 * @Description: Page:
 * @Author: xuling
 * @Date: 2020-12-22 13:26:17
 * @LastEditTime: 2020-12-28 19:14:57
 * @LastEditors: xuling
 * @UpdateLogs: logs
 */
import React, { Component, useEffect } from "react";
// import Form, { Field } from "rc-field-form";
import Form, { Field } from "../components/my-rcfield-form/";
import Input from "../components/Input";

const nameRules = { required: true, message: "请输⼊姓名！" };
const passworRules = { required: true, message: "请输⼊密码！" };

// export default function MyRCFieldForm(props) {
//   // * useForm 自定义Hook
//   const [form] = Form.useForm();

//   const onFinish = val => {
//     console.log("onFinish", val); //sy-log
//   };
//   // 表单校验失败执⾏
//   const onFinishFailed = val => {
//     console.log("onFinishFailed", val); //sylog
//   };

//   useEffect(() => {
//     console.log("form", form); //sy-log
//     form.setFieldsValue({ username: "default" });
//   }, []);

//   return (
//     <div>
//       <h3>MyRCFieldForm</h3>
//       <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//         <Field name="username" rules={[nameRules]}>
//           <Input placeholder="input Username" />
//         </Field>
//         <Field name="password" rules={[passworRules]}>
//           <Input placeholder="input Password" />
//         </Field>
//         <button>Submit</button>
//       </Form>
//     </div>
//   );
// }

export default class MyRCFieldForm extends Component {
  formRef = React.createRef();
  componentDidMount() {
    console.log("form", this.formRef.current); //sy-log
    this.formRef.current.setFieldsValue({ username: "default" });
  }

  onFinish = val => {
    console.log("onFinish", val); //sy-log
  };

  // 表单校验失败执行
  onFinishFailed = val => {
    console.log("onFinishFailed", val); //sy-log
  };
  render() {
    return (
      <div>
        <h3>MyRCFieldForm</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
          <Field name="username" rules={[nameRules]}>
            <Input placeholder="Username" />
          </Field>
          <Field name="password" rules={[passworRules]}>
            <Input placeholder="Password" />
          </Field>
          <button>Submit</button>
        </Form>
      </div>
    );
  }
}
