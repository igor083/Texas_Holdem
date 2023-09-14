import ReactDOM from "react-dom/client";

import { App } from "./App";
import { ToastContainer } from "react-toastify";
import { ConfigProvider, theme } from "antd";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";


const { darkAlgorithm } = theme;

ReactDOM.createRoot(document.getElementById("root")!)
  .render(
    <ConfigProvider theme={{algorithm: darkAlgorithm}}>
      <App />
      <ToastContainer />
    </ConfigProvider>
  );
