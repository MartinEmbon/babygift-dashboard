import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";  // Import the auth reducer

const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the auth reducer to your store
  },
});

export default store;
