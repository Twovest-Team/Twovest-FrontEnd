import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notifications",
  initialState: {},
  reducers: {
    showNotification: (state, action) => {
      const id  = action.payload;
      state[id] = true;
    },
    hideNotification: (state, action) => {
      const id  = action.payload;
      state[id] = false;
    },
  }
});

export const { showNotification, hideNotification } = notificationSlice.actions;


export const getCurrentNotificationState = (state, id) => state.notificationSlice[id];

export default notificationSlice.reducer;
