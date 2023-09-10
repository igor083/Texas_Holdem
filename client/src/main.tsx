import ReactDOM from "react-dom/client";

import { App } from "./App";
import { SocketProvider } from "./hooks/useSocket";
import { ToastContainer } from "react-toastify";
import { ConfigProvider, theme } from "antd";

import "./global.scss";
import "react-toastify/dist/ReactToastify.css";


const { darkAlgorithm } = theme;

ReactDOM.createRoot(document.getElementById("root")!)
  .render(
    <ConfigProvider theme={{algorithm: darkAlgorithm}}>
      <SocketProvider>
        <App />
        <ToastContainer />
      </SocketProvider>
    </ConfigProvider>
  );
