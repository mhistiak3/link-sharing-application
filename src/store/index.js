import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import profileReducer from "./profile.slice";
import linksReducer from "./links.slice";


// Store
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    links: linksReducer
  },
});

export default store;
