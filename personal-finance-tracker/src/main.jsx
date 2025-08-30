// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import { initAuthListener } from "./slices/authSlice";


initAuthListener(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
