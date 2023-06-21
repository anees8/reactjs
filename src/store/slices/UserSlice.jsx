import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [], // Array to hold the user users
    page:0,
    limit:10,
    totalRow:0,
    loading: false, // To track if the API request is in progress
    error: null // To store any error occurred during API request
  },
  reducers: {
    setUsers(state, action) {
    
      state.users = action.payload.users;
      state.page = action.payload.currentPage-1;
      state.limit = action.payload.limit;
      state.totalRow=action.payload.totalRow;
    },
  
    usersError(state, action) {
      state.error = action.payload;
    }
  }
});

export default userSlice.reducer;
export const { setUsers, usersError } = userSlice.actions;
