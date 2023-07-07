import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [], // Array to hold the user users
    page:0,
    limit:10,
    totalRow:0,
    loading: false, // To track if the API request is in progress
    error: null, // To store any error occurred during API request
    orderBy:null,
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload.categories;
      state.page = action.payload.currentPage-1;
      state.limit = action.payload.limit;
      state.totalRow=action.payload.totalRow;
      
    },
    setOrderBy(state,action){
      state.orderBy=action.payload;
    },
    categoryError(state, action) {
      state.error = action.payload;
    }
  }
});

export default categorySlice.reducer;
export const { setCategories, categoryError,setOrderBy } = categorySlice.actions;
