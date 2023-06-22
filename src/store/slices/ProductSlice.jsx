import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // Array to hold the user users
    page:0,
    limit:10,
    totalRow:0,
    loading: false, // To track if the API request is in progress
    error: null // To store any error occurred during API request
  },
  reducers: {
    setProducts(state, action) {
    
      state.products = action.payload.products;
      state.page = action.payload.currentPage-1;
      state.limit = action.payload.limit;
      state.totalRow=action.payload.totalRow;
    },
  
    productError(state, action) {
      state.error = action.payload;
    }
  }
});

export default productSlice.reducer;
export const { setProducts, productError } = productSlice.actions;
