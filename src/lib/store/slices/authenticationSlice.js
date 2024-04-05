import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginReducer: (state) => {
      state.isLoggedIn = true;
    },
    logoutReducer: (state) => {
      state.isLoggedIn = initialState.isLoggedIn;
    }
  }
})

export const { loginReducer, logoutReducer } = authenticationSlice.actions;
export default authenticationSlice.reducer;
