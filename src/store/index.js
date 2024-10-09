import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import profileReducer from "./profile.slice";


// Store
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile:profileReducer
  },
});

export default store;
