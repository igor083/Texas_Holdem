import ReactDOM from "react-dom/client";

import { App } from "./App";
import { SocketProvider } from "./hooks/useSocket";
import { ToastContainer } from "react-toastify";

import "./global.scss";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!)
  .render(
    <SocketProvider>
      <App />
      <ToastContainer />
    </SocketProvider>
  );
