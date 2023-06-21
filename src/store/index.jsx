import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/UserSlice";
import loginSlice from "./slices/LoginSlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    login: loginSlice
  }
});

export default store;
