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

const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;
// "1012843152092-12e81f4ltttv10c4gf2itqjg9ukur34s.apps.googleusercontent.com";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
          <ToastContainer position="top-center" autoClose={1500} theme="dark"/>
        </GoogleOAuthProvider>
      </Provider>
    </ApolloProvider>
  </BrowserRouter>
);
