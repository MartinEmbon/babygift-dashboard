import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";  // Import Provider
import App from "./App";
import store from "./redux/store";  // Import the Redux store
import "./index.css";

// Wrap the App component in Provider and pass the Redux store
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>  {/* Wrap your App with Provider */}
    <App />
  </Provider>
);
