import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "./slices/financeSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    finance: financeReducer,
    auth: authReducer,
  },
});
