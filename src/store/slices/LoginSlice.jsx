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
      localStorage.setItem("token", action.payload.token);
    },

    logoutUser(state, action) {
      state.token = null;
      localStorage.removeItem("token");
    },

    loginError(state, action) {
      state.error = action.payload;
      
    },
    setLoader(state, action){
      state.loading = action.payload;
    
    }
  }
});

export default loginSlice.reducer;
export const { loginUser, logoutUser, loginError,setLoader } = loginSlice.actions;
