import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/UserSlice";
import loginSlice from "./slices/LoginSlice";
import productSlice from "./slices/ProductSlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    login: loginSlice,
    products:productSlice
  }
});

export default store;
