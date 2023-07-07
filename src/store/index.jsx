import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/UserSlice";
import loginSlice from "./slices/LoginSlice";
import productSlice from "./slices/ProductSlice";
import categorySlice from "./slices/CategorySlice";
const store = configureStore({
  reducer: {
    users: userSlice,
    login: loginSlice,
    products:productSlice,
    categories:categorySlice
  }
});

export default store;
