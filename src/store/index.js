import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";


// Store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
