/*
 * @Description: Page:
 * @Author: xuling
 * @Date: 2020-12-08 19:41:16
 * @LastEditTime: 2020-12-31 16:32:05
 * @LastEditors: xuling
 * @UpdateLogs: logs
 */
import "antd/dist/antd.css";
import AntdFormPage from "./pages/AntdFormPage";
import ContextPage from "./pages/ContextPage";
import HocPage from "./pages/HocPage";
import MyRCFieldForm from "./pages/MyRcFieldForm";
import ReactReduxPage from "./pages/ReactReduxPage";
import ReactReduxHookPage from "./pages/ReactReduxHookPage";
import ReduxPage from "./pages/ReduxPage";
import HooksPage from "./pages/HooksPage";

function App() {
  return (
    <div className="App">
      {/* <ContextPage />
			<HocPage /> */}
      {/* <AntdFormPage /> */}
      {/* <MyRCFieldForm /> */}
      {/* <ReduxPage /> */}
      {/* <ReactReduxPage /> */}
      <ReactReduxHookPage />
      {/* <HooksPage /> */}
    </div>
  );
}

export default App;
