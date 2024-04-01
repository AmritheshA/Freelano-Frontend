import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/Store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="185648007858-r1ljiemuucjleg0m1m7se6d20npuq0t6.apps.googleusercontent.com">
        <App />
        <ToastContainer position="top-center" theme="dark"
        />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
