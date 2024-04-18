import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/Store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./Graphql/apolloClient.ts";


ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="185648007858-r1ljiemuucjleg0m1m7se6d20npuq0t6.apps.googleusercontent.com">
          <App />
          <ToastContainer position="top-center" autoClose={1500} theme="dark"/>
        </GoogleOAuthProvider>
      </Provider>
    </ApolloProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
