import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: null,
    token: null
  },
  reducers: {
    loginUser(state, action) {
      state.token = action.payload.token;
      state.loading = false;
      localStorage.setItem("token", action.payload.token);
    },

    logoutUser(state, action) {
      state.token = null;
      state.loading = false;
      localStorage.removeItem("token");
    },

    loginError(state, action) {
      state.error = action.payload;
    }
  }
});

export default loginSlice.reducer;
export const { loginUser, logoutUser, loginError } = loginSlice.actions;
