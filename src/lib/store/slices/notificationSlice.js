import { createSlice } from "@reduxjs/toolkit";

const initialState= {
  message: "",
  isVisible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload;
      state.isVisible = true;
    },
    hideNotification: (state) => {
      state.message = initialState.message;
      state.isVisible = initialState.isVisible;
    }
  }
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
