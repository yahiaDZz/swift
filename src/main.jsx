import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: "your-domain.com", // Replace with your actual domain
  cookieSecure: process.env.NODE_ENV === "production", // Secure cookies in production
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
